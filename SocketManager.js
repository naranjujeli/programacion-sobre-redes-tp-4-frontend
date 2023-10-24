class SocketManager {
    constructor(cronopios) {
        console.log("SocketManager initialized");
        this.PORT = 5000;
        this.socket = io.connect('http://localhost:' + this.PORT);

        this.socket.on("connect", () => {
            console.log("Established connection with the server");
        });

        this.socket.on("new_gen", (data) => {
            for (let i = 0; i < cronopios.length; i++) {
                cronopios[i] = data[Object.keys(data)[i]]
            }
        })

        this.socket.on("disconnect", () => {
            console.log("The connection was closed");
        });
    }

    sendDeadCronopios(deadCronopios) {
        const deadCronopiosAsJSON = {};
        for (let i = 0; i < deadCronopios.length; i++) {
            deadCronopiosAsJSON[i] = deadCronopios[i];
        }
        this.socket.emit("dead_gen", deadCronopiosAsJSON);
    }
}