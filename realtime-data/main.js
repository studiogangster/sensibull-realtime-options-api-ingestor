

const WebSocket = require('ws');
const lib = require('./lib.js');
// Replace 'ws://your-websocket-server-url' with the actual WebSocket server URL
const serverUrl = 'https://wsrelay.sensibull.com/broker/1?consumerType=platform_pro';


const customHeaders = {
    'Accept-Encoding': 'gzip, deflate',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0',
    'Origin': 'https://web.sensibull.com'
};

var expiries = lib.expiries();

expiries = [expiries.shift()]

expiries.forEach((expiry) => {


    const ws = new WebSocket(serverUrl, {
        headers: customHeaders
    });

    ws.on('open', () => {
        // 14286351
        console.log('Connected to the WebSocket server');

        let scrips = [];

        const expiries = lib.expiries();

        lib.instruments().forEach(i => {

            scrips.push(
                { "underlying": i, "expiry": expiry },

            );

        })


        // scrips = [scrips.shift()];
        // underlying-stats

        // console.log(scrips);
        let message = {
            "msgCommand": "subscribe", "dataSource": "option-chain", "brokerId": 1, "tokens": [], "underlyingExpiry": scrips
            , "uniqueId": ""
        };

        message = JSON.stringify(message);
        // console.log(message);
        // Send a message to the server after connecting
        // ws.send(message);


        // Debug

        scrips = scrips.map(script=>script.underlying);
        let msg = { "msgCommand": "subscribe", "dataSource": "underlying-stats", "brokerId": 1, "tokens": scrips, "underlyingExpiry": [], "uniqueId": "" };
        // console.log(msg);

        msg = JSON.stringify(msg);
        ws.send(msg);

        msg = { "msgCommand": "subscribe", "dataSource": "quote-binary", "brokerId": 1, "tokens": scrips, "underlyingExpiry": [], "uniqueId": "" };
        // console.log(msg);

        msg = JSON.stringify(msg);

        ws.send(msg);


        // 
        ws.send(message);


    });

    ws.on('message', (data) => {
        // console.log(`Received: ${data}`);
        let message = lib.decodeData(data);
        // console.log(message)
        lib.print(message)

    });

    ws.on('close', () => {
        console.log('Connection closed');
    });

    ws.on('error', (error) => {
        console.error(`WebSocket error: ${error.message} ${error}`);
    });

    // To send a message after the connection is established (you can do this anytime)
    // ws.send('Your message here


})
