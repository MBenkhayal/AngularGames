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
  walls = [];
  score = 0;
  highScore: number;
  cellWidth = 10; //used for both width/height of an individual cell
  gameOn = false;
  interval;
  foodLocation;

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext("2d");
    /* The below width/height setting is necessary to correct the canvas rendering and remove blurriness
      and improper sizing */
    this.context.canvas.width = this.width;
    this.context.canvas.height = this.height;
    this.highScore = parseInt(localStorage.getItem("snakeScore")) || 0;
  }

  startGame() {
    this.direction = "right";
    this.snake = [{ x: 4, y: 0 }, { x: 3, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }];
    this.walls = [];
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem("snakeScore")) || 0;
    this.gameOn = true;
    this.createFood();

    this.interval = setInterval(() => {
      this.drawBoard();
    }, 50);
  }

  drawBoard() {
    //paint canvas
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.width, this.height);

    //paint snake
    this.snake.forEach(cell => {
      this.paintCell(cell.x, cell.y)
    });

    //create and paint food
    this.paintCell(this.foodLocation.x, this.foodLocation.y, true);

    //paint walls
    for (var i = 0; i < this.walls.length; i++) {
      for (var j = 0; j < this.walls[i].length; j++) {
        this.paintCell(this.walls[i][j].x, this.walls[i][j].y, false, true);
      }
    }

    this.moveSnake();
  }

  paintCell(x, y, isFood = false, isWall = false) {
    if (isFood) {
      this.context.fillStyle = "brown";
    } else if (isWall) {
      this.context.fillStyle = "pink";
    } else {
      this.context.fillStyle = "green";
    }

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
      if (this.score > this.highScore) {
        localStorage.setItem("snakeScore", this.score.toString());
        this.highScore = this.score;
      }
      this.gameOn = false;
    }

    //need to clean up this code
    var tail = { x: xHead, y: yHead };
    //check if food is eaten, if so, do not pop snake tail, just "expand" snake one block and create new food
    if (xHead == this.foodLocation.x && yHead == this.foodLocation.y) {
      this.createFood();
      this.score++;
      this.createWalls();
    } else {
      tail = this.snake.pop();
    }
    tail.x = xHead;
    tail.y = yHead;
    this.snake.unshift(tail);
  }

  checkCollision(xHead, yHead) {
    if (xHead === -1 || xHead == this.width / this.cellWidth || yHead == -1 ||
      yHead === this.height / this.cellWidth || this.checkWallCollision(this.snake)) {
      return true;
    }
    if (this.snake.find((cell) => {
      return (xHead == cell.x && yHead == cell.y);
    })) {
      return true;
    };
  }

  checkWallCollision(arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var a = 0; a < this.walls.length; a++) {
        for (var j = 0; j < this.walls[a].length; j++) {
          if (arr[i].x == this.walls[a][j].x && arr[i].y == this.walls[a][j].y) return true;
        }
      }
    }
    return false;
  }

  createFood() {
    do {
      var xTemp = Math.round(Math.random() * (this.width - this.cellWidth) / this.cellWidth);
      var yTemp = Math.round(Math.random() * (this.height - this.cellWidth) / this.cellWidth);
      this.foodLocation = { x: xTemp, y: yTemp };
    } while (this.checkWallCollision(this.foodLocation));
  }

  createWalls() { //TODO: need to ensure it cant be created anywhere on the snake
    if (this.score % 2 === 0) {
      var tempArr = [];
      var direction = Math.floor(Math.random() * 2);
      var start = Math.floor(Math.random() * 49) + 1;
      var start2 = Math.floor(Math.random() * 49) + 1;
      if (direction === 0) {
        for (var i = 0; i < 5; i++) {
          if (start % 2 === 0) tempArr.push({ x: start2 + i, y: start });
          else tempArr.push({ x: start, y: start2 + i });
        }
      } else {
        for (var i = 4; i >= 0; i--) {
          if (start % 2 === 0) tempArr.push({ x: start2 + i, y: start });
          else tempArr.push({ x: start, y: start2 + i });
        }
      }
      this.walls.push(tempArr);
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
