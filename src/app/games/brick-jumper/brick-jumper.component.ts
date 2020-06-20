import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { PlayerBrick } from './player-brick.model';
import { Brick } from './brick.model';

@Component({
  selector: 'app-brick-jumper',
  templateUrl: './brick-jumper.component.html',
  styleUrls: ['./brick-jumper.component.scss']
})
export class BrickJumperComponent implements OnInit {
  @ViewChild('brickJumperCanvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  context: any;
  interval: any;
  intervalSpeed: number;
  width: number;
  height: number;
  count: number;
  gameOn: boolean;
  playerBrick: PlayerBrick;
  obstacles: Array<Brick>;

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.width = this.canvas.nativeElement.width;
    this.height = this.canvas.nativeElement.height;
    this.gameOn = false;
    this.playerBrick = new PlayerBrick(360, 350, 30, 30, 'blue');
  }

  startGame() {
    this.gameOn = true;
    this.intervalSpeed = 15;
    this.count = 0;
    this.obstacles = new Array<Brick>();
    this.interval = setInterval(() => {
      this.drawBoard();
    }, this.intervalSpeed);
  }

  drawBoard() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.drawBottomLine();
    this.drawPlayerBrick();
    this.drawObstacles();
    this.checkCollision();

    this.count += 1;
    if (this.count === 120) { // create a new object to send at the player brick
      this.addObstacle();
      this.count = 0;
    }
  }

  drawBottomLine() {
    this.context.beginPath();
    this.context.moveTo(0, 380);
    this.context.lineTo(750, 380);
    this.context.stroke();
  }

  drawPlayerBrick() {
    if (this.playerBrick.jumpDirection === 'up') {
      if (this.playerBrick.y > this.playerBrick.startingY - 50) {
        this.playerBrick.y--;
      } else {
        this.playerBrick.jumpDirection = 'down';
      }
    } else if (this.playerBrick.jumpDirection === 'down') {
      if (this.playerBrick.y < this.playerBrick.startingY) {
        this.playerBrick.y++;
      } else {
        this.playerBrick.jumpDirection = '';
      }
    }

    this.context.beginPath();
    this.context.rect(this.playerBrick.x, this.playerBrick.y, this.playerBrick.width, this.playerBrick.height);
    this.context.fillStyle = this.playerBrick.color;
    this.context.fill();
    this.context.closePath();
  }

  addObstacle() {
    const newBrick = new Brick(750, 360, 20, 20, 'black');
    this.obstacles.push(newBrick);
  }

  drawObstacles() {
    this.removeObstacle();
    this.obstacles.forEach(brick => {
      this.context.beginPath();
      this.context.rect(brick.x, brick.y, brick.width, brick.height);
      this.context.fillStyle = brick.color;
      this.context.fill();
      this.context.closePath();
      brick.x -= 2;
    });
  }

  removeObstacle() {
    if (this.obstacles[0] && this.obstacles[0].x + this.obstacles[0].width === 0) {
      this.obstacles.splice(0, 1);
    }
  }

  checkCollision() {

  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    const key = event.key;
    if (key === ' ' && this.playerBrick.jumpDirection === '') {
      this.playerBrick.jumpDirection = 'up';
    }
  }
}
