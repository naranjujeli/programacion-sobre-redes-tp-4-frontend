const WINDOW_SIZE = new Vector(1500, 800);

class SocketManager {
    constructor(cronopios) {
        this.PORT = 5000;
        this.socket = io.connect('http://localhost:' + this.PORT);

        this.socket.on("connect", () => {
            console.log("Established connection with the server");
        });

        this.socket.on("new_gen", (data) => {
            console.log("Received new generation");
            cronopios = data.map((cronopio) => {
                const { diameter, a, b, t } = cronopio;
                return new Cronopio(
                    new Vector(Math.random() * 1500, Math.random() * 800),
                    diameter,
                    a,
                    b,
                    t
                );
            })
        });

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