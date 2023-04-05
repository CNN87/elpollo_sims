class Bottle extends MoveableObject{
    y= 360;
    height = 80;
    width = 60;

    IMAGE_BOTTLE_ON_GROUND = "img/6_salsa_bottle/1_salsa_bottle_on_ground.png";

    offset = {
        top: 20,
        bottom: 10,
        right: 20,
        left: 20,
    };

    constructor(){
        super().loadImage(this.IMAGE_BOTTLE_ON_GROUND);
        this.x = 200 + Math.random() * 2000 ; 
     }
}