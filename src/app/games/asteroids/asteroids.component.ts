// Spaceship source: https://opengameart.org/content/spaceship-8

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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
}