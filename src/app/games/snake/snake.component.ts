import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit {
  @ViewChild("canvas", { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  context: any;// = this.canvas.getContext("2d");
  width = 500;
  height = 500;
  direction = "right";
  snake = [];
  score = 0;

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext("2d");
  }

  startGame() {
    this.direction = "right";
    this.snake = [{ x: 4, y: 0 }, { x: 3, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }];
    this.score = 0;

    setInterval(() => {
      this.drawBoard();
    }, 40);
  }

  drawBoard() {

  }
}
