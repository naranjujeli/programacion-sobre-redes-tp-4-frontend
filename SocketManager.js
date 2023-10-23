class SocketManager {
    constructor() {
        this._PORT = 9999;
        this._socket = io.connect('http://localhost:' + this._PORT);

        this._socket.on("connect", () => {
            console.log("New connection established");
        });

        this._socket.on("draw-a-circle", (info) => {
            console.log(`Received: ${JSON.stringify(info)}`);
        });

        this._socket.on("disconnect", () => {
            console.log("The connection was closed");
        });
    }
}