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
  xStart: number;
  yStart: number;
  xOffset = 2;
  yOffset = -2;

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext("2d");
    this.width = this.canvas.nativeElement.width;
    this.height = this.canvas.nativeElement.height;
    this.xStart = this.width / 2;
    this.yStart = this.height - 50;
  }

  startGame() {
    this.interval = setInterval(() => {
      this.drawBoard();
    }, 10);
  }

  drawBoard() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.drawBall();

    this.xStart += this.xOffset;
    this.yStart += this.yOffset;
  }

  drawBall() {
    this.context.beginPath();
    this.context.arc(this.xStart, this.yStart, 10, 0, Math.PI * 2);
    this.context.fillStyle = "green";
    this.context.fill();
    this.context.closePath();
  }
}
