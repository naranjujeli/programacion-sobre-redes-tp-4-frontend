const WINDOW_SIZE = new Vector(1500, 800);

class SocketManager {
    constructor(cronopios) {
        this.PORT = 5000;
        this.waitingNewGen = false;
        this.socket = io.connect('http://localhost:' + this.PORT);

        this.socket.on("connect", () => {
            console.log("Established connection with the server");
        });

        this.socket.on("new_gen", (data) => {
            this.waitingNewGen = false;
            console.log("Received new generation");
            for (let i = 0; i < cronopios.length; i++) {
                const { diameter, a, b, t } = data["cronopios"][i];
                cronopios[i] = new Cronopio(
                    new Vector(Math.random() * 1500, Math.random() * 800),
                    diameter,
                    a,
                    b,
                    t
                );
            }
        });

        this.socket.on("disconnect", () => {
            console.log("The connection was closed");
        });
    }

    sendDeadCronopios(deadCronopios) {
        const deadCronopiosAsJSON = {"cronopios": new Array(deadCronopios.length)};
        for (let i = 0; i < deadCronopios.length; i++) {
            deadCronopiosAsJSON.cronopios[i] = deadCronopios[i];
        }
        console.log("Enviando cronopios muertos");
        this.socket.emit("dead_gen", deadCronopiosAsJSON);
    }
}