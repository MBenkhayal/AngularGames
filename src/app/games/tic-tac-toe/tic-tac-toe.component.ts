import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onButtonClick(event) {
    console.log(event)
  }
}
