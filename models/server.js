// Express Server
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const Sockets = require('./socket');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;

        // Http Server
        this.server = http.createServer(this.app);

        // Socket configuration
        this.io = socketIo(this.server, {
            /* configurations */
            cors: {
                origin: '*',
                methods: ["GET", "POST"],
            }
        });
    }

    middlewares() {
        this.app.use(cors({
            origin: '*',
            credentials: true
        }));
    }

    configSockets() {
        new Sockets(this.io);
    }

    execute() {
        // Initializations
        this.middlewares();

        // Socket configuration
        this.configSockets();

        // Start the server
        this.server.listen(this.port, () => {
            console.log('Server running on port: ', this.port);
        });
    }
}

module.exports = Server;