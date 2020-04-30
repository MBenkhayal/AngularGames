// Spaceship source: https://opengameart.org/content/spaceship-8



/***************************
 * 
 * ADD DIRECTIONALGAMEOBJECT GENERIC CLASS
 * 
 */


import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-asteroids',
  templateUrl: './asteroids.component.html',
  styleUrls: ['./asteroids.component.scss']
})
export class AsteroidsComponent implements OnInit {
  @ViewChild("asteroidsCanvas", { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  context: any;
  interval: any;
  intervalSpeed = 10;
  gameOn = false;
  width: number;
  height: number;
  spaceship = new Image();
  turningLeft = false;
  turningRight = false;
  spaceshipX: number;
  spaceshipY: number;
  spaceshipSpeed = 0;
  spaceshipAngle = 0;
  spaceshipWidth = 50;
  spaceshipHeight = 50;

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext("2d");
    this.width = this.canvas.nativeElement.width;
    this.height = this.canvas.nativeElement.height;
    this.spaceship.src = '../../../assets/spiked ship 3. small.blue_.png';
  }

  startGame() {
    this.spaceshipSpeed = 0;
    this.spaceshipX = this.width / 2 - 25;
    this.spaceshipY = this.height / 2 - 25;
    // this.context.drawImage(this.spaceship, this.spaceshipX, this.spaceshipY, this.spaceshipWidth, this.spaceshipHeight);

    this.interval = setInterval(() => {
      this.drawBoard();
    }, this.intervalSpeed);
  }

  drawBoard() {
    this.context.clearRect(0, 0, this.width, this.height);

    this.drawShip();
  }

  drawShip() {
    this.context.save();
    this.context.drawImage(this.spaceship, this.spaceshipX, this.spaceshipY, this.spaceshipWidth, this.spaceshipHeight);
    this.context.translate(this.spaceshipX, this.spaceshipY);
    this.context.rotate(this.spaceshipAngle);
    this.context.restore();

    // this.spaceshipAngle += 0 * Math.PI / 180;
    console.log(this.spaceshipX, this.spaceshipY)
    this.spaceshipX += this.spaceshipSpeed * Math.sin(this.spaceshipAngle);
    this.spaceshipY -= this.spaceshipSpeed * Math.cos(this.spaceshipAngle);
    console.log(this.spaceshipX, this.spaceshipY);
  }

  @HostListener('document:keydown', ["$event"])
  handleKeydown(event: KeyboardEvent) {
    var key = event.keyCode;
    if (key == 37 || key == 65) { //left
      this.turningLeft = true;
    } else if (key == 39 || key == 68) { //right
      this.turningRight = true;
    } else if (key == 38 || key == 87) { //up
      this.spaceshipSpeed = 2;
    } else if (key == 40 || key == 83) { //down
      this.spaceshipSpeed = -1;
    } else if (key == 32) { //space
      //shoot
    }
  }

  @HostListener('document:keyup', ["$event"])
  handleKeyup(event: KeyboardEvent) {
    var key = event.keyCode;
    if (key == 37 || key == 65) { //left
      this.turningLeft = false;
    } else if (key == 39 || key == 68) { //right
      this.turningRight = false;
    } else if (key == 38 || key == 87) { //up
      this.spaceshipSpeed = 0;
    } else if (key == 40 || key == 83) { //down
      this.spaceshipSpeed = 0;
    }
  }
}