import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

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
  cellWidth = 10; //used for both width/height of an individual cell
  interval;

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext("2d");
    /* The below width/height setting is necessary to correct the canvas rendering and remove blurriness
      and improper sizing */
    this.context.canvas.width = this.width;
    this.context.canvas.height = this.height;
  }

  startGame() {
    this.direction = "right";
    this.snake = [{ x: 4, y: 0 }, { x: 3, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }];
    this.score = 0;

    this.interval = setInterval(() => {
      this.drawBoard();
    }, 100);
  }

  drawBoard() {
    //paint canvas
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.width, this.height);

    //paint snake
    this.snake.forEach(cell => {
      this.paintCell(cell.x, cell.y)
    });

    this.moveSnake();
  }

  paintCell(x, y) {
    this.context.fillStyle = "green";
    this.context.fillRect(x * this.cellWidth, y * this.cellWidth, this.cellWidth, this.cellWidth);
    this.context.strokeStyle = "white";
    this.context.strokeRect(x * this.cellWidth, y * this.cellWidth, this.cellWidth, this.cellWidth);
  }

  moveSnake() {
    var xHead = this.snake[0].x;
    var yHead = this.snake[0].y;

    switch (this.direction) {
      case "right":
        xHead++;
        break;
      case "left":
        xHead--;
        break;
      case "up":
        yHead--;
        break;
      case "down":
        yHead++;
        break;
    }

    if (this.checkCollision(xHead, yHead)) {
      clearInterval(this.interval);
    }

    var tail = this.snake.pop();
    tail.x = xHead;
    tail.y = yHead;
    this.snake.unshift(tail);
  }

  checkCollision(xHead, yHead) {
    if (xHead === -1 || xHead == this.width / this.cellWidth || yHead == -1 || yHead === this.height / this.cellWidth) {
      return true;
    }
  }

  @HostListener('document:keydown', ["$event"])
  handleKeydown(event: KeyboardEvent) {
    var key = event.keyCode;
    if ((key == 37 || key == 65) && this.direction != "right") {
      this.direction = "left";
    }
    else if ((key == 38 || key == 87) && this.direction != "down") {
      this.direction = "up";
    }
    else if ((key == 39 || key == 68) && this.direction != "left") {
      this.direction = "right";
    }
    else if ((key == 40 || key == 83) && this.direction != "up") {
      this.direction = "down";
    }
  }
}
