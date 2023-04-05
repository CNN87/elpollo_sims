class MoveableObject extends DrawableObject {
 
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lasthit = 0;
    ground = 155;

    hurt_sound = new Audio("audio/hurt.mp3");

    offset = {
        top: 20,
        bottom: 0,
        left: 10,
        right: 20,
    };

    applyGravity(){
        stopInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
              this.y = this.ground;
            }
          }, 1000 / 25);

    }

    isAboveGround(){
        if (this instanceof ThrowableObject) {
            return true;      
        }else {
            return this.y < this.ground;
        }
    }

    // character.isColliding(chicken)
    isColliding (mo) {
        return  this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
                this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
                this.x + this.offset.left < mo.x + mo.width - mo.offset.right  &&
                this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }
    
    hit() {
        if (this instanceof Character && !this.isHurt()) {
            this.hitCharacter();
        } else if (this instanceof Endboss && this.energy >= 0.5) {
            this.hitEndboss();
        } else if (this instanceof Chicken && this.energy > 80) {
            this.hitChicken();
        }
        this.lastHitAtTime();
    }

    lastHitAtTime(){
        // this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        } else{
            this.lasthit = new Date().getTime();
        }
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lasthit; //difference in ms
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }
    isDead(){
        return this.energy == 0;
    }

    hitCharacter() {
        this.energy -= 20;
        this.world.playSound(this.hurt_sound);
    }

    hitEndboss(){
        this.energy -= 10;
    }

    hitChicken() {
        this.energy -= 100;
    }

    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed; 
        // console.log(this.x) ;      
    }

    moveLeft(){
        this.x -= this.speed;
    }
  
    jump(){
        this.speedY = 23;
    }

}