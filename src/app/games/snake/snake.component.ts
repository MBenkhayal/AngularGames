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

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext("2d");
  }
}
