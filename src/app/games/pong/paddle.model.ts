export class Paddle {
    x: number;
    y: number;
    width: number;
    height: number;
    position: number;
    color: string;
    direction: string;

    initPaddle(x: number, canvasHeight: number) {
        this.x = x;
        this.y = 250;
        this.width = 10;
        this.height = 75;
        this.position = canvasHeight - this.y - (this.height / 2);
        this.color = "white";
        this.direction = "";
    }
}