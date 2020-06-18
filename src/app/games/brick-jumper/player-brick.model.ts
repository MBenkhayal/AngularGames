export class PlayerBrick {
    x: number;
    y: number;
    jumpMovement: number;
    color: string;
    height: number;
    width: number;

    constructor() {
        this.x = 360;
        this.y = 350;
        this.jumpMovement = 0;
        this.color = 'blue';
        this.height = 30;
        this.width = 30;
    }
}