/*
 *TODO
 *Add single player mode option
*/

import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  // get access to all of the individual buttons
  @ViewChild('00') zeroZero: { nativeElement: { innerText: string; disabled: boolean; }; };
  @ViewChild('01') zeroOne: { nativeElement: { innerText: string; disabled: boolean; }; };
  @ViewChild('02') zeroTwo: { nativeElement: { innerText: string; disabled: boolean; }; };
  @ViewChild('10') oneZero: { nativeElement: { innerText: string; disabled: boolean; }; };
  @ViewChild('11') oneOne: { nativeElement: { innerText: string; disabled: boolean; }; };
  @ViewChild('12') oneTwo: { nativeElement: { innerText: string; disabled: boolean; }; };
  @ViewChild('20') twoZero: { nativeElement: { innerText: string; disabled: boolean; }; };
  @ViewChild('21') twoOne: { nativeElement: { innerText: string; disabled: boolean; }; };
  @ViewChild('22') twoTwo: { nativeElement: { innerText: string; disabled: boolean; }; };

  playerTurn = '';
  gameStatus = '';
  gameBoard = [];
  turn = 0;

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
    this.turn = 0;
  }

  buttonDisabled(row: number, col: number) {
    return this.gameBoard[row][col] !== '';
  }

  onButtonClick(button: { textContent: any; }, row: number, col: number) {
    this.turn++;
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

  checkBoard(lastPlayed: string) {
    if (this.gameBoard[0][0] === lastPlayed && this.gameBoard[0][1] === lastPlayed && this.gameBoard[0][2] === lastPlayed ||
      this.gameBoard[1][0] === lastPlayed && this.gameBoard[1][1] === lastPlayed && this.gameBoard[1][2] === lastPlayed ||
      this.gameBoard[2][0] === lastPlayed && this.gameBoard[2][1] === lastPlayed && this.gameBoard[2][2] === lastPlayed ||

      this.gameBoard[0][0] === lastPlayed && this.gameBoard[1][0] === lastPlayed && this.gameBoard[2][0] === lastPlayed ||
      this.gameBoard[0][1] === lastPlayed && this.gameBoard[1][1] === lastPlayed && this.gameBoard[2][1] === lastPlayed ||
      this.gameBoard[0][2] === lastPlayed && this.gameBoard[1][2] === lastPlayed && this.gameBoard[2][2] === lastPlayed ||

      this.gameBoard[0][0] === lastPlayed && this.gameBoard[1][1] === lastPlayed && this.gameBoard[2][2] === lastPlayed ||
      this.gameBoard[2][0] === lastPlayed && this.gameBoard[1][1] === lastPlayed && this.gameBoard[0][2] === lastPlayed) {
      // set all buttons to be disabled, game ends, declare winner
      this.gameStatus = `The winner is ${lastPlayed}!`;
      this.disableAllButtons();
    } else if (this.turn === 9) {
      this.gameStatus = `No winner, please play again!`;
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
