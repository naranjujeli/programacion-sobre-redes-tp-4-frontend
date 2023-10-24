const CRONOPIOS_QUANTITY = 21;
const FOOD_QUANTITY = 100;

const cronopios = new Array(CRONOPIOS_QUANTITY);
const socketManager = new SocketManager(cronopios);
const foods = new Array(FOOD_QUANTITY)

function setup() {
    let canvas = createCanvas(1500, 800);
    canvas.parent('simulation');

    background(0);
}

function draw() {
    background(0);
    
    fill(0, 128, 0);

    if (foods.length === 0) {
        resetFoods();
    } else {
        foods.forEach((food) => {
            circle(food.x, food.y, 15);
        });
    }

    if (cronopios[0] === undefined) {
        // NOTHING
    } else if (!allCronopiosDead()) {
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
    } else {
        socketManager.sendDeadCronopios(cronopios);
    }

}

function resetFoods() {
    for (let i = 0; i < FOOD_QUANTITY; i++) {
        foods[i] = new Vector(Math.random() * 1500, Math.random() * 800);
    }
}

function allCronopiosDead() {
    cronopios.forEach((cronopio) => {
        if (cronopio.alive) {
            return false;
        }
    })
    return true;
}