/* TODO
 * 1) figure out curve of ball collision against paddles, not just direct from x
 * 2) Implement more in depth score keeping for points scored to a victory (ie first to 5 wins)
 *    Computer can also get smarter as player scores points
 * 3) add effects for hitting the ball while moving in the same direction (exists for opposite direction)
 * 4) look into lag on some of the speeds generated
 * 5) remove super slow start speeds (x and y offset need to start 2.5-5)
 * 6) allow curving/spin when hitting the ball in the opposite direction, instead of just a basic operation
 * 7) paddles don't have a default speed, they speed up to a max that either takes longer over time or
 *    is a lower max over time
 * 8) reset paddle to center on new game
*/

import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Paddle } from './paddle.model';

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.scss']
})
export class PongComponent implements OnInit {
  @ViewChild('pongCanvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  context: any;
  interval: any;
  width = 750;
  height = 500;
  gameOn = false;
  paddles = []; // 0 is player, 1 is computer
  ballX: number;
  ballY: number;
  ballOffsetX: number;
  ballOffsetY: number;
  ballRadius = 10;
  gameStatus = 'Press Start Game to play!';
  numHits: number;
  updateXOffset: boolean;
  paddleSpeed: number;

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    let temp = new Paddle();
    temp.initPaddle(0, this.height);
    this.paddles.push(temp);
    temp = new Paddle();
    temp.initPaddle(this.width - 10, this.height);
    this.paddles.push(temp);
  }

  startGame() {
    this.numHits = 0;
    this.paddleSpeed = 3;
    this.gameOn = true;
    this.updateXOffset = false;
    this.ballX = this.width / 2;
    this.ballY = this.height / 2;
    do {
      this.ballOffsetX = Math.floor((Math.random() - .5) * 5);
    } while (this.ballOffsetX === 0);
    do {
      this.ballOffsetY = Math.floor((Math.random() - .5) * 5);
    } while (this.ballOffsetY === 0);

    this.gameStatus = 'Game on!';

    this.interval = setInterval(() => {
      this.drawBoard();
    }, 10);
  }

  drawBoard() {
    this.context.clearRect(0, 0, this.width, this.height);

    this.checkCollision();
    this.moveComputerPaddle();
    this.drawPaddles();
    this.drawBall();

    if (this.updateXOffset) {
      if (this.ballOffsetX < 0) {
        this.ballOffsetX -= .1;
      } else if (this.ballOffsetX > 0) {
        this.ballOffsetX += .1;
      }
      this.updateXOffset = false;
    }
    this.ballX += this.ballOffsetX;
    this.ballY += this.ballOffsetY;
  }

  moveComputerPaddle() {
    if (this.ballY > this.paddles[1].position) {
      this.paddles[1].direction = 'down';
    } else if (this.ballY < this.paddles[1].position) {
      this.paddles[1].direction = 'up';
    } else {
      this.paddles[1].direction = '';
    }
  }

  drawPaddles() {
    this.paddles.forEach(paddle => {
      this.context.beginPath();
      this.context.rect(paddle.x, paddle.position, paddle.width, paddle.height);
      this.context.fillStyle = paddle.color;
      this.context.fill();
      this.context.closePath();

      if (paddle.direction === 'up' && (paddle.y + paddle.height / 2) < this.height) {
        paddle.y += this.paddleSpeed;
        paddle.position = this.height - paddle.y - (paddle.height / 2);
      } else if (paddle.direction === 'down' && (paddle.y - paddle.height / 2) > 0) {
        paddle.y -= this.paddleSpeed;
        paddle.position = this.height - paddle.y - (paddle.height / 2);
      }
    });
  }

  drawBall() {
    this.context.beginPath();
    this.context.arc(this.ballX, this.ballY, this.ballRadius, 0, Math.PI * 2);
    this.context.fillStyle = 'red';
    this.context.fill();
    this.context.closePath();
  }

  checkCollision() {
    this.checkPaddleCollision();
    this.checkWallCollision();
  }

  checkWallCollision() {
    if (this.ballX + this.ballRadius > this.width) {
      this.gameStatus = 'You win!';
      this.gameOn = false;
      clearInterval(this.interval);
    } else if (this.ballX - this.ballRadius < 0) {
      this.gameStatus = 'You lose!';
      this.gameOn = false;
      clearInterval(this.interval);
    }
    if (this.ballY + this.ballRadius > this.height || this.ballY - this.ballRadius < 0) {
      this.ballOffsetY = -this.ballOffsetY;
    }
  }

  checkPaddleCollision() {
    if (this.ballOffsetX < 0 &&
      this.ballX - this.ballRadius <= this.paddles[0].x + this.paddles[0].width &&
      this.ballY + this.ballRadius >= this.paddles[0].position &&
      this.ballY + this.ballRadius <= this.paddles[0].position + this.paddles[0].height) {
      this.ballOffsetX = -this.ballOffsetX;
      this.updateNumHits();
      // each time the player hits the ball, increase yoffset a bit
      if (this.ballOffsetY < 0) {
        if (this.paddles[0].direction === 'down') {
          this.ballOffsetY += .05;
        } else {
          this.ballOffsetY -= .1;
        }
      } else if (this.ballOffsetY > 0) {
        if (this.paddles[0].direction === 'up') {
          this.ballOffsetY -= .05;
        } else {
          this.ballOffsetY += .1;
        }
      }
    } else if (this.ballOffsetX > 0 &&
      this.ballX + this.ballRadius >= this.paddles[1].x &&
      this.ballY + this.ballRadius >= this.paddles[1].position &&
      this.ballY + this.ballRadius <= this.paddles[1].position + this.paddles[1].height) {
      this.updateNumHits();
      this.ballOffsetX = -this.ballOffsetX;
    }
  }

  updateNumHits() {
    this.numHits++;
    if (this.numHits % 5 === 0) {
      this.updateXOffset = true;
    }
    if (this.numHits % 10 === 0) {
      this.paddleSpeed -= .1;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    const key = event.key;
    if (key === 'ArrowUp' || key === 'w') { // up
      this.paddles[0].direction = 'up';
    } else if (key === 'ArrowDown' || key === 's') { // down
      this.paddles[0].direction = 'down';
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyup(event: KeyboardEvent) {
    const key = event.key;
    if (key === 'ArrowUp' || key === 'w' || key === 'ArrowDown' || key === 's') {
      this.paddles[0].direction = '';
    }
  }
}
