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

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext("2d");
    this.width = this.canvas.nativeElement.width;
    this.height = this.canvas.nativeElement.height;
  }


}
