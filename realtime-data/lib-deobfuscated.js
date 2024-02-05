const instrumentSymbols = require("./instruments_symbols.js");

function decodeUint8ArrayToTimestamp(uint8Array) {
    let stringValue = "";
    for (let index = 0; index < uint8Array.length; index++) {
        stringValue += String.fromCharCode(uint8Array[index]);
    }
    let timestampInSeconds = parseInt(stringValue, 10);
    let date = new Date(timestampInSeconds * 1000);
    return date;
}

var Uint8Array = Uint8Array,
    Uint16Array = Uint16Array,
    Uint32Array = Uint32Array;

var fixedHuffmanLengths = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
var fixedHuffmanSymbols = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);

function buildHuffmanTables(lengths, startBits) {
    let symbols = [];
    for (let i = 0; i < 31; ++i) {
        symbols[i] = startBits += 1 << (lengths[i - 1]);
    }
    let huffmanTable = new Uint16Array(symbols[30]);
    for (let i = 1; i < 30; ++i) {
        for (let symbol = symbols[i - 1]; symbol < symbols[i]; ++symbol) {
            huffmanTable[symbol] = (symbol - symbols[i - 1]) << 5 | i;
        }
    }
    return [symbols, huffmanTable];
}

let literalHuffmanCodes = buildHuffmanTables(fixedHuffmanLengths, 2);
let lengthHuffmanCodes = buildHuffmanTables(new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]), 0);
let distanceHuffmanCodes = buildHuffmanTables(new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), 0);

function huffmanDecode(data, codes) {
    let length = data.length;
    let result = new Uint8Array(0);

    let getBit = (index) => {
        return (data[index >> 3] >> (index & 7)) & 1;
    };

    let lengthCodeTable = codes[0];
    let lengthTable = codes[1];

    let readValue = (lengthCode, index, table) => {
        let value = table[index] >>> (lengthCode - 1);
        return value & ((1 << (lengthCode - 1)) - 1);
    };

    for (let i = 0; i < length;) {
        let value = readValue(9, i, lengthTable);
        i += lengthTable[value];
        let lengthCode = lengthCodeTable[value];

        if (lengthCode < 16) {
            result = appendUint8Array(result, new Uint8Array([lengthCode]));
        } else {
            let lengthExtraBits = lengthCode === 16 ? 2 : (lengthCode === 17 ? 3 : 7);
            let lengthExtraValue = readValue(lengthExtraBits, i, lengthTable);
            i += lengthExtraBits;
            let extraLength = 3 + lengthExtraValue;

            let distanceCode = readValue(5, i, distanceTable);
            i += distanceTable[distanceCode];
            let distanceExtraBits = distanceCode <= 3 ? 0 : (distanceCode <= 5 ? 1 : 7);
            let distanceExtraValue = readValue(distanceExtraBits, i, distanceTable);
            i += distanceExtraBits;
            let extraDistance = 1 + distanceExtraValue;

            let insertPosition = result.length - (distanceCode <= 3 ? 1 : 2) * extraDistance;
            result = appendUint8Array(result, result.slice(insertPosition, insertPosition + extraLength));
        }
    }

    return result;
}

function appendUint8Array(array1, array2) {
    let newArray = new Uint8Array(array1.length + array2.length);
    newArray.set(array1);
    newArray.set(array2, array1.length);
    return newArray;
}

function decompress(data) {
    let output = new Uint8Array(0);
    let length = data.length;
    let i = 0;

    while (i < length) {
        let compressionFlag = data[i++];
        let chunkSize = data[i++] | (data[i++] << 8);
        let chunk = data.subarray(i, i + chunkSize);
        i += chunkSize;

        if (compressionFlag) {
            let decodedChunk = huffmanDecode(chunk, literalHuffmanCodes);
            output = appendUint8Array(output, decodedChunk);
        } else {
            output = appendUint8Array(output, chunk);
        }
    }

    return output;
}

function parseInstruments(data) {
    let instruments = [];
    let offset = 0;

    while (offset < data.length) {
        let instrument = {};
        let nameLength = data[offset++];
        instrument.name = decodeUint8ArrayToTimestamp(data.subarray(offset, offset + nameLength));
        offset += nameLength;
        instrument.id = data[offset++];
        instrument.type = data[offset++];
        instrument.symbol = instrumentSymbols[instrument.id];
        instruments.push(instrument);
    }

    return instruments;
}

function processHeader(header) {
    let instrumentsData = header.slice(0, 64);
    let additionalData = header.slice(64);

    let instruments = parseInstruments(instrumentsData);
    let decompressedData = decompress(additionalData);

    return {
        instruments: instruments,
        additionalData: decompressedData
    };
}

module.exports = {
    processHeader: processHeader
};
