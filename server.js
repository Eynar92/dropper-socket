const express = require('express');
const { Server } = require('socket.io')

const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Node JS + Socket App Listening on port ${port}`);
});

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    socket.on('new-order', (data => {
        console.log(data);
        io.emit('new-order', data);
    }));

});

app.get('/', (req, res) => {
    return res.send('<h1>Hello world from Node JS server</h1>');
});