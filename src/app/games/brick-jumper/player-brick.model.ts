import { Brick } from './brick.model';

export class PlayerBrick extends Brick {
    startingY: number;
    jumpMovement: number;
    jumpDirection: string;

    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.startingY = 350;
        this.jumpMovement = 0;
        this.jumpDirection = '';
    }
}
