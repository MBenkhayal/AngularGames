import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
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
  paddles = []; //0 is player, 1 is computer

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext("2d");
    var temp = new Paddle();
    temp.initPaddle(0, this.height);
    this.paddles.push(temp);
    temp = new Paddle();
    temp.initPaddle(this.width - 10, this.height);
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
      this.context.rect(paddle.x, paddle.position, paddle.width, paddle.height);
      this.context.fillStyle = paddle.color;
      this.context.fill();
      this.context.closePath();

      if (paddle.direction == "up" && (paddle.y + paddle.height / 2) < this.height) {
        paddle.y += 3;
        paddle.position = this.height - paddle.y - (paddle.height / 2);
      } else if (paddle.direction == "down" && (paddle.y - paddle.height / 2) > 0) {
        paddle.y -= 3;
        paddle.position = this.height - paddle.y - (paddle.height / 2);
      }
    });
  }

  @HostListener('document:keydown', ["$event"])
  handleKeydown(event: KeyboardEvent) {
    var key = event.keyCode;
    if (key == 38 || key == 87) { //up
      this.paddles[0].direction = "up";
    } else if (key == 40 || key == 83) { //down
      this.paddles[0].direction = "down";
    }
  }

  @HostListener('document:keyup', ["$event"])
  handleKeyup(event: KeyboardEvent) {
    var key = event.keyCode;
    if (key == 38 || key == 87 || key == 40 || key == 83) {
      this.paddles[0].direction = "";
    }
  }
}
