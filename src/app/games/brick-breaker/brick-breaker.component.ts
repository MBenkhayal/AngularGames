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
  movingRight = false;
  movingLeft = false;

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext("2d");
    this.width = this.canvas.nativeElement.width;
    this.height = this.canvas.nativeElement.height;
    this.xPosition = this.width / 2;
    this.yPosition = this.height - 50;
    this.paddlePosition = (this.width - this.paddleWidth) / 2;
  }

  startGame() {
    this.interval = setInterval(() => {
      this.drawBoard();
    }, 10);
  }

  drawBoard() {
    this.context.clearRect(0, 0, this.width, this.height);

    this.drawBall();
    this.checkWallCollision();
    this.drawPaddle();

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

  checkWallCollision() {
    if (this.yPosition + this.yOffset > this.height - this.ballRadius || this.yPosition + this.yOffset < this.ballRadius) {
      this.yOffset = - this.yOffset;
    }
    if (this.xPosition + this.xOffset > this.width - this.ballRadius || this.xPosition + this.xOffset < this.ballRadius) {
      this.xOffset = - this.xOffset;
    }
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
