import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  //get access to all of the individual buttons
  @ViewChild('00') zeroZero;
  @ViewChild('01') zeroOne;
  @ViewChild('02') zeroTwo;
  @ViewChild('10') oneZero;
  @ViewChild('11') oneOne;
  @ViewChild('12') oneTwo;
  @ViewChild('20') twoZero;
  @ViewChild('21') twoOne;
  @ViewChild('22') twoTwo;

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
    this.gameStatus = `Player x's turn`;
  }

  buttonDisabled(row, col) {
    return this.gameBoard[row][col] != '';
  }

  onButtonClick(button, row, col) {
    if (button.textContent != '') { //think about this vs just disabling the button
      return;
    }

    if (this.playerTurn === 'x') {
      this.gameBoard[row][col] = 'x';
      button.textContent = 'x';
      this.gameStatus = `Player o's turn`;
      this.playerTurn = 'o';
      this.checkBoard('x');
    } else if (this.playerTurn === 'o') {
      this.gameBoard[row][col] = 'o';
      button.textContent = 'o';
      this.gameStatus = `Player x's turn`;
      this.playerTurn = 'x';
      this.checkBoard('o');
    }
    // console.log(this.zerozero.nativeElement.innerText)
    // this.checkBoard();
  }

  checkBoard(lastPlayed) {
    if (this.gameBoard[0][0] == lastPlayed && this.gameBoard[0][1] == lastPlayed && this.gameBoard[0][2] == lastPlayed ||
      this.gameBoard[1][0] == lastPlayed && this.gameBoard[1][1] == lastPlayed && this.gameBoard[1][2] == lastPlayed ||
      this.gameBoard[2][0] == lastPlayed && this.gameBoard[2][1] == lastPlayed && this.gameBoard[2][2] == lastPlayed ||

      this.gameBoard[0][0] == lastPlayed && this.gameBoard[1][0] == lastPlayed && this.gameBoard[2][0] == lastPlayed ||
      this.gameBoard[0][1] == lastPlayed && this.gameBoard[1][1] == lastPlayed && this.gameBoard[2][1] == lastPlayed ||
      this.gameBoard[0][2] == lastPlayed && this.gameBoard[1][2] == lastPlayed && this.gameBoard[2][2] == lastPlayed ||

      this.gameBoard[0][0] == lastPlayed && this.gameBoard[1][1] == lastPlayed && this.gameBoard[2][2] == lastPlayed ||
      this.gameBoard[2][0] == lastPlayed && this.gameBoard[1][1] == lastPlayed && this.gameBoard[0][2] == lastPlayed) {
      //set all buttons to be disabled, game ends, declare winner
      this.gameStatus = `The winner is ${lastPlayed}!`;
    }
  }
}
