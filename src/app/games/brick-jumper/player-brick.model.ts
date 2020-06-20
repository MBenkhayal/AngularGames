import { Brick } from './brick.model';

export class PlayerBrick extends Brick {
    startingY: number;
    jumpMovement: number;
    jumpDirection: string;
    color: string;

    constructor(x, y, width, height) {
        super(x, y, width, height);
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
