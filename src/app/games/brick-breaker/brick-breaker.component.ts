/*
 * TODO:
 * 1) randomize ball starting direction/angle
 * 3) better physics on hit/angle changes?
 * 2) set up the brick collision so corners aren't ignored
 * 3) change blocks size on levelup
 * 4) change block location based on new size on levelup
 * 5) add powerups
*/

import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-brick-breaker',
  templateUrl: './brick-breaker.component.html',
  styleUrls: ['./brick-breaker.component.scss']
})
export class BrickBreakerComponent implements OnInit {
  @ViewChild("brickBreakerCanvas", { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  context: any;
  interval: any;
  intervalSpeed: number;
  width: number;
  height: number;
  xPosition: number;
  yPosition: number;
  xOffset = 2;
  yOffset = -2;
  ballRadius = 10;
  paddleHeight = 10;
  paddleWidth = 100;
  paddlePosition: number;
  brickRows = 5;
  brickColumns = 3;
  brickWidth = 100;
  brickHeight = 20;
  brickPadding = 10;
  brickOffset = 100;
  bricks = [];
  movingRight = false;
  movingLeft = false;
  gameStatus = "Press start game to play!";
  gameOn = false;
  score = 0;
  highScore: number;

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext("2d");
    this.width = this.canvas.nativeElement.width;
    this.height = this.canvas.nativeElement.height;
    this.highScore = parseInt(localStorage.getItem("brickBreakerScore")) || 0;
  }

  startGame() {
    this.intervalSpeed = 10;
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem("brickBreakerScore")) || 0;
    this.gameOn = true;
    this.gameStatus = "Playing, good luck!";
    this.xPosition = this.width / 2;
    this.yPosition = this.height - 50;
    this.paddlePosition = (this.width - this.paddleWidth) / 2;
    this.xOffset = 2;
    this.yOffset = -2;
    this.generateBricks();
    this.interval = setInterval(() => {
      this.drawBoard();
    }, this.intervalSpeed);
  }

  drawBoard() {
    this.context.clearRect(0, 0, this.width, this.height);

    this.drawBall();
    this.checkWallCollision();
    this.drawPaddle();
    this.drawBricks();
    this.drawScore();
    this.checkBrickCollision();

    this.xPosition += this.xOffset;
    this.yPosition += this.yOffset;
  }

  drawBall() {
    this.context.beginPath();
    this.context.arc(this.xPosition, this.yPosition, this.ballRadius, 0, Math.PI * 2);
    this.context.fillStyle = "green";
    this.context.fill();
    this.context.closePath();
  }

  drawPaddle() {
    this.context.beginPath();
    this.context.rect(this.paddlePosition, this.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
    this.context.fillStyle = "blue";
    this.context.fill();
    this.context.closePath();

    if (this.movingLeft) {
      this.paddlePosition -= 10;
      if (this.paddlePosition < 0) {
        this.paddlePosition = 0;
      }
    } else if (this.movingRight) {
      this.paddlePosition += 10;
      if (this.paddlePosition + this.paddleWidth > this.width) {
        this.paddlePosition = this.width - this.paddleWidth;
      }
    }
  }

  drawBricks() {
    for (var i = 0; i < this.brickRows; i++) {
      for (var j = 0; j < this.brickColumns; j++) {
        if (this.bricks[i][j].showWall) {
          this.bricks[i][j].x = i * (this.brickWidth + this.brickPadding) + this.brickOffset;
          this.bricks[i][j].y = j * (this.brickHeight + this.brickPadding) + this.brickOffset;
          this.context.beginPath();
          this.context.rect(this.bricks[i][j].x, this.bricks[i][j].y, this.brickWidth, this.brickHeight);
          this.context.fillStyle = "purple";
          this.context.fill();
          this.context.closePath();
        }
      }
    }
  }

  drawScore() {
    this.context.font = "12px Arial";
    this.context.fillStyle = "red";
    this.context.fillText(`Score: ${this.score} Highscore: ${this.highScore}`, 8, 20);
  }

  checkWallCollision() {
    if (this.yPosition + this.yOffset < this.ballRadius) {
      this.yOffset = - this.yOffset;
    } else if (this.yPosition + this.yOffset > this.height - this.ballRadius) {
      if (this.xPosition > this.paddlePosition && this.xPosition < this.paddlePosition + this.paddleWidth) {
        this.yOffset = -this.yOffset;
      } else {
        clearInterval(this.interval);
        this.gameStatus = "Game Over!";
        this.gameOn = false;
        if (this.score > this.highScore) {
          localStorage.setItem("brickBreakerScore", this.score.toString());
          this.highScore = this.score;
        }
      }
    }
    if (this.xPosition + this.xOffset < this.ballRadius || this.xPosition + this.xOffset > this.width - this.ballRadius) {
      this.xOffset = - this.xOffset;
    }
  }

  checkBrickCollision() {
    for (let i = 0; i < this.brickRows; i++) {
      for (let j = 0; j < this.brickColumns; j++) {
        if (this.bricks[i][j].showWall &&
          this.xPosition + this.ballRadius > this.bricks[i][j].x &&
          this.xPosition + this.ballRadius < this.bricks[i][j].x + this.brickWidth &&
          this.yPosition + this.ballRadius > this.bricks[i][j].y &&
          this.yPosition + this.ballRadius < this.bricks[i][j].y + this.brickHeight) {
          this.yOffset = -this.yOffset;
          this.bricks[i][j].showWall = 0;
          this.score++;
          if (this.score % 15 == 0) {
            this.levelUp();
          }
        }
      }
    }
  }

  generateBricks() {
    for (let i = 0; i < this.brickRows; i++) {
      this.bricks[i] = [];
      for (let j = 0; j < this.brickColumns; j++) {
        this.bricks[i][j] = { x: 0, y: 0, showWall: 1 };
      }
    }
  }

  levelUp() {
    this.intervalSpeed--;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.drawBoard();
    }, this.intervalSpeed);
    this.bricks = [];
    this.generateBricks();
  }

  @HostListener('document:keydown', ["$event"])
  handleKeydown(event: KeyboardEvent) {
    var key = event.keyCode;
    if ((key == 37 || key == 65)) {
      this.movingLeft = true;
    }
    else if ((key == 39 || key == 68)) {
      this.movingRight = true;
    }
  }

  @HostListener('document:keyup', ["$event"])
  handleKeyup(event: KeyboardEvent) {
    var key = event.keyCode;
    if ((key == 37 || key == 65)) {
      this.movingLeft = false;
    }
    else if ((key == 39 || key == 68)) {
      this.movingRight = false;
    }
  }
}
