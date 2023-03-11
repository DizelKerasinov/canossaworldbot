const mineflayer = require('mineflayer');

const botArgs = {
    host: '46.4.95.80',
    port: '39652',
    username: "Bot",
    version: '1.19.3'
};

const initBot = () => {

    // Setup bot connection
    let bot = mineflayer.createBot(botArgs);

    bot.on('login', () => {
        let botSocket = bot._client.socket;
        console.log(`Logged in to ${botSocket.server ? botSocket.server : botSocket._host}`);
    });

    bot.on('end', () => {
        console.log(`Disconnected`);

        // Attempt to reconnect
        setTimeout(initBot, 5000);
    });

    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            console.log(`Failed to connect to ${err.address}:${err.port}`)
        }
        else {
            console.log(`Unhandled error: ${err}`);
        }
    });
};

initBot();