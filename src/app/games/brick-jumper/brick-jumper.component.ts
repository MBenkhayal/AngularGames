import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.width = this.canvas.nativeElement.width;
    this.height = this.canvas.nativeElement.height;
  }

  startGame() {
    this.gameOn = true;
    this.interval = setInterval(() => {
      this.drawBoard();
    }, this.intervalSpeed);
  }

  drawBoard() {
    this.context.clearRect(0, 0, this.width, this.height);

  }
}
