class Character extends MoveableObject{
    height = 280;
    width = 140;
    // y= 155;
    y= 70;
    speed= 10;
    world;

    walking_sound = new Audio('audio/cartoonrun.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    background_sound = new Audio('audio/music.mp3');
    throw_sound = new Audio('audio/throw.mp3');
    sleeping_sound = new Audio('audio/sleeping.mp3');
    dead_sound = new Audio("audio/dead.mp3");
    
    coins = 0;
    bottles = 0;
    idleTimeout = 0;

    offset = {
        top: 120,
        bottom: 10,
        left: 15,
        right: 35,
    };

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    IMAGES_IDLE = [
        "img/2_character_pepe/1_idle/idle/I-1.png",
        "img/2_character_pepe/1_idle/idle/I-2.png",
        "img/2_character_pepe/1_idle/idle/I-3.png",
        "img/2_character_pepe/1_idle/idle/I-4.png",
        "img/2_character_pepe/1_idle/idle/I-5.png",
        "img/2_character_pepe/1_idle/idle/I-6.png",
        "img/2_character_pepe/1_idle/idle/I-7.png",
        "img/2_character_pepe/1_idle/idle/I-8.png",
        "img/2_character_pepe/1_idle/idle/I-9.png",
        "img/2_character_pepe/1_idle/idle/I-10.png",
    ];
    IMAGES_SLEEPING = [
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEPING);
        
        this.applyGravity();

        this.animate();
    }

    animate(){
        stopInterval(() => this.moveCharacter(), 1000 / 60);
        stopInterval(() => this.animateCharacter(), 100);
    }
    
    //animation with stop intervalls 
    animateCharacter(){
        this.sleeping_sound.pause();
        if(this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            world.playSound(this.dead_sound);
            this.idleTimeout = 0;
        } else if(this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.idleTimeout = 0;
        } else if(this.isAboveGround()){
            this.playAnimation(this.IMAGES_JUMPING);
            this.idleTimeout = 0;
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            this.idleTimeout = 0;
        } else if(this.world.keyboard.D){
            this.idleTimeout = 0;
        } else if (this.notMoving()){
            this.playAnimation(this.IMAGES_IDLE);
            this.idleTimeout += 150;
            if (this.idleTimeout >= 5000 ) {
              this.playAnimation(this.IMAGES_SLEEPING);
              this.world.playSound(this.sleeping_sound);
            }
        }
    }

    notMoving(){
        return (
            !this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.UP &&
            !this.world.keyboard.DOWN &&
            !this.world.keyboard.SPACE &&
            !this.world.keyboard.D
        );
    }

    // move character  to end x and sound implemented
    moveCharacter(){
        this.walking_sound.pause();
        // character move right to end 
        if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
            this.moveRight();
            this.otherDirection = false;
            this.world.playSound(this.walking_sound);
        }
        // character move left to -600
        if(this.world.keyboard.LEFT && this.x > -600 ){
            this.moveLeft();
            this.otherDirection = true;
            this.world.playSound(this.walking_sound);
        }
        // character jump
        if(this.world.keyboard.SPACE && !this.isAboveGround()){
            this.jump();
            this.world.playSound(this.jumping_sound);
        }
        this.world.camera_x = -this.x + 100;
    }

}