// const socketManager = new SocketManager();

const cronopio = new Cronopio(
    new Vector(600, 400),
    50,
    40,
    40,
    30
);

function setup() {
    let canvas = createCanvas(1500, 800);
    canvas.parent('simulation');

    background(0);
}

function draw() {
    background(0);
    
    textSize(60);
    text(cronopio.life, 10, 60);
    text(`Velocity: \n${cronopio.velocity.x} \n${cronopio.velocity.y}`, 10, 130);

    fill(0, 128, 0);

    if (cronopio.alive) {
        circle(cronopio.position.x, cronopio.position.y, cronopio.diameter);
        cronopio.time();
    } else {
        background(255, 0, 0);
    }
}