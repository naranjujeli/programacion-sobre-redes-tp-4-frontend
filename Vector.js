class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getMagnitude() {
        return (Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)));
    }

    getDirection(mode="DEGREES") {
        if (mode === "DEGREES") {
            return (Math.atan(this.y / this.x));
        } else if (mode === "RADIANS") {
            return (Math.atan(this.y / this.x) * Math.PI/180);
        }
    }
    
    setMagnitude(newMagnitude) {
        this.setDirection(this.getDirection());
        this.scale(newMagnitude);
    }

    setDirection(direction) {
        this.x = this.getDirection()*Math.cos(direction);
        this.y = this.getDirection()*Math.sin(direction);
    }
    
    changeDirection(off) {
        this.setDirection(this.getDirection() + off);
    }

    add(otherVector) {
        return new Vector(this.x + otherVector.x, this.y + otherVector.y);
    }

    scale(s) {
        this.x = this.x * s; 
        this.y = this.y * s;
    }

    normalize() {
        const direction = this.getDirection();
        const newVector = new Vector(1, 1);
        newVector.setDirection(direction);
        return newVector;
    }
}