class Coin extends MoveableObject{
    height = 150;
    width = 150;
    y = 360;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    offset = {
        top: 50,
        bottom: 50,
        right: 50,
        left: 50,
    };

    constructor() {
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.x = 200 + Math.random() * 1900; 
        this.y = 280 - Math.random() * 200;

        this.animate();
    }

    animate() {
        stopInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 150 + Math.random() * 150);
    }
}