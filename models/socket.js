class Sockets {

    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {

            console.log('new connection: ', socket.id);

            socket.on('new-order', (data) => {
                console.log('New order received: ', data);
                this.io.emit('new-order', data);
            });

        })
    }
}

module.exports = Sockets;