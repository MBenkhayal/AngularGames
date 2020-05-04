export class Paddle {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    direction: string;

    initPaddle(x: number) {
        this.x = x;
        this.y = 250;
        this.width = 10;
        this.height = 75;
        this.color = "white";
        this.direction = "";
    }
}