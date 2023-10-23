let cron = new Cronopio({x: 0, y: 0}, 10);
const socketManager = new SocketManager(cron);

function setup() {
    let canvas = createCanvas(1500, 800);
    canvas.parent('simulation');

    background(0);
}

function draw() {
    if (mouseIsPressed) {
        stroke(255);
        fill(0);
    } else {
        stroke(0);
        fill(255);
    }
    circle(mouseX, mouseY, 50);

    if (cron) {
        fill(red(255));
        circle(cron.position.x, cron.position.y, 20);
    }
}