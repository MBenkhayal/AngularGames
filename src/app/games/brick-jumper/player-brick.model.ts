export class PlayerBrick {
    x: number;
    y: number;
    jumpMovement: number;
    color: string;

    constructor() {
        this.x = 375;
        this.y = 450;
        this.jumpMovement = 0;
        this.color = 'blue';
    }
}