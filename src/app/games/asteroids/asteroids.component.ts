// Spaceship source: https://opengameart.org/content/spaceship-8



/***************************
 * 
 * ADD DIRECTIONALGAMEOBJECT GENERIC CLASS
 * 
 */


import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Spaceship } from './spaceship.model';

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
  canvasWidth: number;
  canvasHeight: number;
  spaceship: Spaceship;
  drifting: boolean;

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext("2d");
    this.canvasWidth = this.canvas.nativeElement.width;
    this.canvasHeight = this.canvas.nativeElement.height;
    this.spaceship = new Spaceship();
  }

  startGame() {
    this.spaceship.InitializeSpaceship(this.canvasWidth, this.canvasHeight);

    // this.context.drawImage(this.spaceship, this.spaceship.x, this.spaceship.y, this.spaceshipWidth, this.spaceshipHeight);

    this.interval = setInterval(() => {
      this.drawBoard();
    }, this.intervalSpeed);
  }

  drawBoard() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.drawShip();
  }

  drawShip() {
    this.context.save();
    this.context.drawImage(this.spaceship.image, this.spaceship.x, this.spaceship.y, this.spaceship.width, this.spaceship.height);

    this.context.translate(this.canvasWidth / 2, this.canvasHeight / 2);

    this.context.rotate(this.spaceship.angle);
    this.context.restore();
    if (this.drifting && this.spaceship.speed != 0) {
      if (this.spaceship.speed > 0) {
        this.spaceship.speed -= .025;
        this.spaceship.speed = Number(this.spaceship.speed.toFixed(3));
      } else if (this.spaceship.speed < 0) {
        this.spaceship.speed += .025;
        this.spaceship.speed = Number(this.spaceship.speed.toFixed(3));
      }
    }

    this.spaceship.angle += this.spaceship.moveAngle * Math.PI / 180;
    this.spaceship.x += this.spaceship.speed * Math.sin(this.spaceship.angle);
    this.spaceship.y -= this.spaceship.speed * Math.cos(this.spaceship.angle);
  }

  calculateSpeed() {

  }

  calculateAngles() {

  }

  @HostListener('document:keydown', ["$event"])
  handleKeydown(event: KeyboardEvent) {
    var key = event.keyCode;
    if (key == 37 || key == 65) { //left
      this.spaceship.moveAngle = -1;
      this.drifting = false;
    } else if (key == 39 || key == 68) { //right
      this.spaceship.moveAngle = 1;
      this.drifting = false;
    } else if (key == 38 || key == 87) { //up
      this.spaceship.speed = 2;
      this.drifting = false;
    } else if (key == 40 || key == 83) { //down
      this.spaceship.speed = -1;
      this.drifting = false;
    } else if (key == 32) { //space
      //shoot
    }
  }

  @HostListener('document:keyup', ["$event"])
  handleKeyup(event: KeyboardEvent) {
    var key = event.keyCode;
    if (key == 37 || key == 65) { //left
      this.spaceship.moveAngle = 0;
    } else if (key == 39 || key == 68) { //right
      this.spaceship.moveAngle = 0;
    } else if (key == 38 || key == 87) { //up
      // this.spaceship.speed = 0;
      this.drifting = true;
    } else if (key == 40 || key == 83) { //down
      // this.spaceship.speed = 0;
      this.drifting = true;
    }
  }
}