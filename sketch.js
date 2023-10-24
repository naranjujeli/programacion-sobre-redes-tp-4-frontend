const cronopios = new Array(CRONOPIOS_QUANTITY);
const socketManager = new SocketManager(cronopios);

const CRONOPIOS_QUANTITY = 21;
const FOOD_QUANTITY = 100;

for (let i = 0; i < CRONOPIOS_QUANTITY; i++) {
    cronopios[i] = new Cronopio(
        new Vector(Math.random() * 1500, Math.random() * 800),
        50,
        0.5,
        0.00001,
        30,
        1000
    );
}

const foods = new Array(FOOD_QUANTITY)
for (let i = 0; i < FOOD_QUANTITY; i++) {
    foods[i] = new Vector(Math.random() * 1500, Math.random() * 800);
}

function setup() {
    let canvas = createCanvas(1500, 800);
    canvas.parent('simulation');

    background(0);
}

function draw() {
    background(0);
    
    fill(0, 128, 0);

    foods.forEach((food) => {
        circle(food.x, food.y, 15);
    });

    cronopios.forEach((cronopio) => {
        if (cronopio.alive) {
            circle(cronopio.position.x, cronopio.position.y, cronopio.diameter*2);
            for (let i = 0; i < foods.length; i++) {
                if (cronopio.ableToEat(foods[i])) {
                    foods.splice(i, 1);
                    cronopio.eat();
                }
            }
            cronopio.time();
        }
    })
}