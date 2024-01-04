const WebSocket = require('ws');

const port = 3024;

const server = new WebSocket.Server({ port });

console.log(`start server: ws://localhost:${port}`);

server.on('connection', (ws) => {
    console.log('connection client');

    ws.send(
        JSON.stringify({
            login: 'server',
            message: 'Добро пожаловать!',
        }),
    );

    ws.on('message', (data, isBinary) => {
        const message = isBinary ? data : data.toString();
        server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});
