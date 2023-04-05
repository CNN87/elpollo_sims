class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    collect_coin_sound = new Audio("audio/coin.mp3");
    collect_bottle_sound = new Audio("audio/bottle.mp3");
    chickendie_sound = new Audio("audio/chickendie.mp3");
    gameover_sound = new Audio("audio/gameoverending.mp3");
    hitbybottle_sound = new Audio("audio/glass.mp3");
    throw_sound = new Audio("audio/throw.mp3");
    bossdied_sound = new Audio("audio/endbossdied.mp3");
    background_sound = new Audio("audio/music.mp3");

    statusBar = new StatusBar();
    statusbarHealth = new StatusBarHealth();
    statusbarCoins = new StatusBarCoins();
    statusbarBottles = new StatusBarBottles();
    statusbarBoss = new StatusBarHealthBoss();
    
    throwableObjects = [];

    timeout = true;
    endboss = this.level.enemies[this.level.enemies.length - 1];
    
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.gameover_sound.pause();
    }

    setWorld(){
        this.character.world = this;
    }

    run(){
        stopInterval(() => {
            this.checkMusic();            
            this.checkCollisionsWithEnemy();
            this.checkCollisionsWithCoin();
            this.checkCollisionsWithBottle();
            this.checkThrowObjects();
            this.checkGameOver();
        }, 60);
    }

    playSound(sound) {
        if (muteActive) {
            sound.play();
        }
        else {
            this.gameover_sound.pause();
            this.background_sound.pause();
        }
    }

    checkMusic(){
        this.gameover_sound.pause();
        this.playSound(this.background_sound);
        this.background_sound.volume = 0.1;
    }

    checkCollisionsWithEnemy() {
        this.level.enemies.forEach((enemy) => {
          this.enemyHurtCharacter(enemy);
          this.hitByBottle(enemy);
        });
    }

    enemyHurtCharacter(enemy) {
        if (this.enemyAlive(enemy) && this.enemyCollidesWithCharacter(enemy)) {
            if (this.enemyIsChicken(enemy) && !this.isJumping()) {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
            } else if (this.enemyIsChicken(enemy)) {
                this.jumpOnHead(enemy);
            } else {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
            }
        }
    }
    
    enemyAlive(enemy) {
        return enemy.energy > 0;
    }

    enemyCollidesWithCharacter(enemy) {
        return this.character.isColliding(enemy);
    }

    enemyIsChicken(enemy) {
        return enemy instanceof Chicken;
    }

    jumpOnHead(enemy) {
        enemy.hit();
        this.character.speedY = 20;
        this.removeChicken(enemy);
    }

    isJumping() {
        return this.character.isAboveGround();
    }

    hitByBottle(enemy) {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(enemy)) {
                enemy.hit();
                bottle.hitEnemy = true;
                if (!this.enemyIsChicken(enemy)) {
                    this.statusbarBoss.setPercentage(this.endboss.energy);
                    // console.log(this.endboss.energy);
                    this.playSound(this.hitbybottle_sound);
                } else {
                    this.removeChicken(enemy);
                    this.playSound(this.hitbybottle_sound);
                }
            }
        });
    }

    removeChicken(enemy) {
        if (this.enemyIsChicken(enemy)) {
            this.playSound(this.chickendie_sound);
            setTimeout(() => {
                let i = this.level.enemies.indexOf(enemy);
                this.level.enemies.splice(i, 1);
            }, 500);
        }
    }

    checkCollisionsWithCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.collectCoin(coin);
                this.addCoin();
                this.statusbarCoins.setPercentage(this.character.coins);
            }
        });
    }

    collectCoin(coin) {
        if (coin instanceof Coin) {
            let i = this.level.coins.indexOf(coin);
            this.playSound(this.collect_coin_sound);
            this.level.coins.splice(i, 1);
        }
    }

    checkCollisionsWithBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.collectBottle(bottle);
                this.addBottle();
                this.statusbarBottles.setPercentage(this.character.bottles);
            }
        });
    }
    
    collectBottle(beer) {
        if (beer instanceof Bottle) {
            let i = this.level.bottles.indexOf(beer);
            this.playSound(this.collect_bottle_sound);
            this.level.bottles.splice(i, 1);
        }
    }

    addCoin() {
        this.character.coins += 10;
    }
    
    addBottle() {
        this.character.bottles += 10;
    }
    
    removeBottle() {
        this.character.bottles -= 10;
    }
    
    checkThrowObjects(){
        if(this.keyboard.D && this.character.bottles >= 0 && this.timeout == true){
            this.timeout = false;
            this.throwBottle();
        }
    }

    throwBottle() {
        setTimeout(() => {
            this.playSound(this.throw_sound);
            let bottle = new ThrowableObject(this.character.x , this.character.y );
            this.throwableObjects.push(bottle);
            this.removeBottle();
            this.statusbarBottles.setPercentage(this.character.bottles);
            this.timeout = true;
        }, 300);
    }

    draw(){
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); //back space for fixed objects
        // this.addToMap(this.statusBar);
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);
        this.checkIfBossIsNear();
        this.ctx.translate(this.camera_x, 0); //forward
        // object and enemies       
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        
        let self =this;
        requestAnimationFrame(function(){
            self.draw();
        });
            
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
           this.flipImage(mo);
        }

        mo.draw(this.ctx) ;
        // mo.drawFrame(this.ctx);
        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    checkIfBossIsNear() {
        if (this.endboss.firstContact) {
            this.addToMap(this.statusbarBoss);
            // this.background_sound.pause();
            // this.playSound(this.gameover_sound);
            // this.gameover_sound.volume = 0.1;
        }
    }

    checkGameOver() {
        if (this.character.isDead()) {
            this.gameOver();
            // this.background_sound.pause();
            // this.playSound(this.gameover_sound);
        } else if (this.endboss && this.endboss.isDead()) {
            this.gameOver();
            
        }
    }

    gameOver() {
        setTimeout(() => {
            this.background_sound.pause();
            // this.playSound(this.gameover_sound);
            // this.gameover_sound.volume = 0.1;
            gameStop();
            document.getElementById("gameover").classList.remove("dnone");
            document.getElementById("btn_restart").classList.remove("dnone");
        }, 1000);
    } 
}