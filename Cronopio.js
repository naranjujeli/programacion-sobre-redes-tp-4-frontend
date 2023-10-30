class Cronopio {
    constructor(
        position, 
        diameter,
        a,
        b,
        t,
        initialLifeDuration=100,
        windowSize=new Vector(1500, 800)
    ) {
        this.position = position;
        this.diameter = diameter;
        this.a = a;
        this.b = b;
        this.t = t;
        this.initialLifeDuration = initialLifeDuration;
        this.life = this.initialLifeDuration;
        this.windowSize = windowSize;
        
        this.alive = true;
        this.velocity = new Vector(0, 0);
        this.duration = 0;
        this.tCounter = 0;
    }

    ableToEat(food) {
        const differenceInX = Math.abs(food.x-this.position.x);
        const differenceInY = Math.abs(food.y-this.position.y);
        const difference = Math.sqrt(Math.pow(differenceInX, 2) + Math.pow(differenceInY, 2));
        return (difference < this.diameter);
    }

    time() {
        this.life--;
        this.duration++;
        if (this.life === 0) {
            this.alive = false;
            return;
        }
        this.tCounter++;
        if (this.tCounter % this.t === 0) {
            this.tCounter = 0;
            this.update();
        }
        this.move();
    }

    update() {
        this.changeVelocity();
        this.updateMovement();
        this.bounce();
    }

    move() {
        this.position = this.position.add(this.velocity);
    }
    
    changeVelocity() {
        this.velocity = this.calculateNewVelocity();
    }

    updateMovement() {
        const angle = Math.random() * 10 - 5;
        this.velocity.changeDirection(angle);
    }

    calculateNewVelocity() {
        const p = (x) => - 25 * (Math.pow(x, 2)) + this.b * x + this.a;
        const f = (x) => 3 / (1 + Math.pow(Math.E, -p(x)));
        const x = 2 * Math.random() - 1;

        const newVelocityMagnitude = f(x);
        const newVelocity = new Vector(1, 1);
        newVelocity.setMagnitude(newVelocityMagnitude);
        return newVelocity;
    }

    bounce() {
        // TODO cambiar esto mas tarde
        const frame = 100;
        if (this.position.x + this.diameter > this.windowSize.x)
            this.position.x = frame;
        if (this.position.x - this.diameter < 0)
            this.position.x = this.windowSize.x-frame;
        if (this.position.y + this.diameter > this.windowSize.y)
            this.position.y = frame;
        if (this.position.y - this.diameter < 0)
            this.position.y = this.windowSize.y-frame;
    }

    eat() {
        this.life += this.initialLifeDuration / 10;
    }

}