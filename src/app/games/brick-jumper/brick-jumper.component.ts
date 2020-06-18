import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { PlayerBrick } from './player-brick.model';

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
  gameOn = false;
  playerPaddle: PlayerBrick;

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.width = this.canvas.nativeElement.width;
    this.height = this.canvas.nativeElement.height;
    this.playerPaddle = new PlayerBrick();
  }

  startGame() {
    this.gameOn = true;
    this.interval = setInterval(() => {
      this.drawBoard();
    }, this.intervalSpeed);
  }

  drawBoard() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.drawBottomLine();
    this.drawPlayerBrick();
  }

  drawBottomLine() {
    this.context.beginPath();
    this.context.moveTo(0, 380);
    this.context.lineTo(750, 380);
    this.context.stroke();
  }

  drawPlayerBrick() {
    this.context.beginPath();
    this.context.rect(this.playerPaddle.x, this.playerPaddle.y, this.playerPaddle.width, this.playerPaddle.height);
    this.context.fillStyle = this.playerPaddle.color;
    this.context.fill();
    this.context.closePath();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    const key = event.key;
    if (key === ' ') {
      //
    }
  }
}
