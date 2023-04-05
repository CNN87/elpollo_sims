class Chicken extends MoveableObject{
    y= 360;
    height = 70;
    width = 60;

    offset = {
        top: 10,
        bottom: 10,
        left: 0,
        right: 10,
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

    chicken_sound = new Audio('audio/chicken.mp3');
    
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 400 + Math.random() * 1900;
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    animate(){
        this.chicken_sound.pause();

        stopInterval(() => {
            // if chicken not dead then move left
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
        
        // if chicken dead then animate and stop move left
        stopInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
          }, 130);

    }
 
}