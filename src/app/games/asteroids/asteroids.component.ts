// Spaceship source: https://opengameart.org/content/spaceship-8

import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-asteroids',
  templateUrl: './asteroids.component.html',
  styleUrls: ['./asteroids.component.scss']
})
export class AsteroidsComponent implements OnInit {
  @ViewChild("asteroidsCanvas", { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  context: any;
  gameOn = false;
  width: number;
  height: number;
  spaceship = new Image();
  turningLeft = false;
  turningRight = false;

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext("2d");
    this.width = this.canvas.nativeElement.width;
    this.height = this.canvas.nativeElement.height;
    this.spaceship.src = '../../../assets/spiked ship 3. small.blue_.png';
  }

  startGame() {
    this.context.drawImage(this.spaceship, this.width / 2 - 25, this.height / 2 - 25, 50, 50);
  }



  @HostListener('document:keydown', ["$event"])
  handleKeydown(event: KeyboardEvent) {
    var key = event.keyCode;
    if ((key == 37 || key == 65)) {
      this.turningLeft = true;
    } else if ((key == 39 || key == 68)) {
      this.turningRight = true;
    } else if (key == 32) {
      //shoot
    }
  }

  @HostListener('document:keyup', ["$event"])
  handleKeyup(event: KeyboardEvent) {
    var key = event.keyCode;
    if ((key == 37 || key == 65)) {
      this.turningLeft = false;
    } else if ((key == 39 || key == 68)) {
      this.turningRight = false;
    }
  }
}