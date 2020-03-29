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
      this.disableAllButtons();
    }
  }

  newGame() {
    this.initializeGame();
    this.resetButtonText();
    this.enableAllButtons();
  }

  resetButtonText() {
    this.zeroZero.nativeElement.innerText = '';
    this.zeroOne.nativeElement.innerText = '';
    this.zeroTwo.nativeElement.innerText = '';
    this.oneZero.nativeElement.innerText = '';
    this.oneOne.nativeElement.innerText = '';
    this.oneTwo.nativeElement.innerText = '';
    this.twoZero.nativeElement.innerText = '';
    this.twoOne.nativeElement.innerText = '';
    this.twoTwo.nativeElement.innerText = '';
  }

  disableAllButtons() {
    this.zeroZero.nativeElement.disabled = true;
    this.zeroOne.nativeElement.disabled = true;
    this.zeroTwo.nativeElement.disabled = true;
    this.oneZero.nativeElement.disabled = true;
    this.oneOne.nativeElement.disabled = true;
    this.oneTwo.nativeElement.disabled = true;
    this.twoZero.nativeElement.disabled = true;
    this.twoOne.nativeElement.disabled = true;
    this.twoTwo.nativeElement.disabled = true;
  }

  enableAllButtons() {
    this.zeroZero.nativeElement.disabled = false;
    this.zeroOne.nativeElement.disabled = false;
    this.zeroTwo.nativeElement.disabled = false;
    this.oneZero.nativeElement.disabled = false;
    this.oneOne.nativeElement.disabled = false;
    this.oneTwo.nativeElement.disabled = false;
    this.twoZero.nativeElement.disabled = false;
    this.twoOne.nativeElement.disabled = false;
    this.twoTwo.nativeElement.disabled = false;
  }
}
