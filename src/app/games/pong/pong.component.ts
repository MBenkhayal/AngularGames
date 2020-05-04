import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Paddle } from './paddle.model';

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.scss']
})
export class PongComponent implements OnInit {
  @ViewChild("pongCanvas", { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  context: any;
  interval: any;
  width = 750;
  height = 500;
  gameOn = false;
  paddles = [];

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext("2d");
    var temp = new Paddle();
    temp.initPaddle(0);
    this.paddles.push(temp);
    temp = new Paddle();
    temp.initPaddle(this.width - 10);
    this.paddles.push(temp);
  }

  startGame() {
    this.gameOn = true;

    this.interval = setInterval(() => {
      this.drawBoard();
    }, 10);
  }

  drawBoard() {
    this.context.clearRect(0, 0, this.width, this.height);

    this.drawPaddles();
  }

  drawPaddles() {
    this.paddles.forEach(paddle => {
      this.context.beginPath();
      this.context.rect(paddle.x, this.height - paddle.y - (paddle.height / 2), paddle.width, paddle.height);
      this.context.fillStyle = paddle.color;
      this.context.fill();
      this.context.closePath();
    });
  }
}
