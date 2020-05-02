export class Spaceship {
    image: HTMLImageElement;
    x: number;
    y: number;
    width: number;
    height: number;
    angle: number;
    moveAngle: number;
    speed: number;

    InitializeSpaceship(canvasWidth, canvasHeight) {
        this.image = new Image();
        this.image.src = './assets/spaceship.png';
        this.x = canvasWidth / 2 - 25;
        this.y = canvasHeight / 2 - 25;
        this.width = 0;
        this.height = 0;
        this.angle = 0;
        this.moveAngle = 0;
        this.speed = 0;
    }
}