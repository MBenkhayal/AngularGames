export class PlayerBrick {
    x: number;
    startingY: number;
    y: number;
    jumpMovement: number;
    height: number;
    width: number;
    jumpDirection: string;
    color: string;

    constructor() {
        this.x = 360;
        this.startingY = 350;
        this.y = this.startingY;
        this.jumpMovement = 0;
        this.height = 30;
        this.width = 30;
        this.jumpDirection = '';
        this.color = 'blue';
    }
}