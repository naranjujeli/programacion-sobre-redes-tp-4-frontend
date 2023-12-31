const CRONOPIOS_QUANTITY = 21;
const FOOD_QUANTITY = 100;

const cronopios = new Array(CRONOPIOS_QUANTITY);
const socketManager = new SocketManager(cronopios);
const foods = new Array(FOOD_QUANTITY)


function setup() {
    resetFoods();
    for (let i = 0; i < cronopios.length; i++) {
        cronopios[i] = new Cronopio(
            new Vector(Math.random() * 1500, Math.random() * 800),
            30,
            0.4,
            0.4,
            30
        )
    }
    
    let canvas = createCanvas(1500, 800);
    canvas.parent('simulation');
    
    background(0);
}

function draw() {
    background(0);

    if (!allCronopiosDead()) {
        fill(0, 128, 0);
        
        if (foods.length === 0) {
            resetFoods();
        } else {
            foods.forEach((food) => {
                circle(food.x, food.y, 15);
            });
        }

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
        if (!socketManager.waitingNewGen) {
            socketManager.sendDeadCronopios(cronopios);
            socketManager.waitingNewGen = true;
        }
    }
}

function resetFoods() {
    for (let i = 0; i < FOOD_QUANTITY; i++) {
        foods[i] = new Vector(Math.random() * 1500, Math.random() * 800);
    }
}

function allCronopiosDead() {
    for (let cronopio of cronopios) {
        if (cronopio.alive) {
            return false;
        }
    }
    return true;
}