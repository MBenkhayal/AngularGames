import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  playerTurn = '';
  gameStatus = '';
  gameBoard = [];

  constructor() { }

  ngOnInit(): void {
    this.initializeGame();
  }

  initializeGame() {
    this.gameBoard = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.playerTurn = 'x';
    this.gameStatus = 'X turn';
  }

  onButtonClick(event, row, col) {
    if(this.playerTurn === 'x') {
      this.gameBoard[row][col] = 'x';
      this.gameStatus = 'O turn';
      this.playerTurn = 'o';
    } else if(this.playerTurn ==='o') {
      this.gameBoard[row][col] = 'o';
      this.gameStatus = 'X turn';
      this.playerTurn = 'x';
    }
    this.checkBoard();
  }

  checkBoard() {
    if(this.gameBoard[0][0] == this.gameBoard[0][1] && this.gameBoard[0][0] == this.gameBoard[0][2] ||
        this.gameBoard[1][0] == this.gameBoard[1][1] && this.gameBoard[1][0] == this.gameBoard[1][2] ||
        this.gameBoard[2][0] == this.gameBoard[2][1] && this.gameBoard[2][0] == this.gameBoard[2][2] ||

        this.gameBoard[0][0] == this.gameBoard[1][0] && this.gameBoard[0][0] == this.gameBoard[2][0] ||
        this.gameBoard[0][1] == this.gameBoard[1][1] && this.gameBoard[0][1] == this.gameBoard[2][1] ||
        this.gameBoard[0][2] == this.gameBoard[1][2] && this.gameBoard[0][2] == this.gameBoard[2][2] ||

        this.gameBoard[0][0] == this.gameBoard[1][1] && this.gameBoard[0][0] == this.gameBoard[2][2] ||
        this.gameBoard[2][0] == this.gameBoard[1][1] && this.gameBoard[2][0] == this.gameBoard[0][2]) {
          //set all buttons to be disabled, game ends, declare winner
        }
  }
}
