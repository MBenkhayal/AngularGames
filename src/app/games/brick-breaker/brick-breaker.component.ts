import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext("2d");
    this.width = this.canvas.nativeElement.width;
    this.height = this.canvas.nativeElement.height;
    this.xPosition = this.width / 2;
    this.yPosition = this.height - 50;
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

  checkWallCollision() {
    if (this.yPosition + this.yOffset > this.height - this.ballRadius || this.yPosition + this.yOffset < this.ballRadius) {
      this.yOffset = - this.yOffset;
    }
    if (this.xPosition + this.xOffset > this.width - this.ballRadius || this.xPosition + this.xOffset < this.ballRadius) {
      this.xOffset = - this.xOffset;
    }
  }
}
