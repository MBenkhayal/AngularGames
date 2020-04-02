import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTacToeComponent } from './tic-tac-toe.component';

fdescribe('TicTacToeComponent', () => {
  let component: TicTacToeComponent;
  let fixture: ComponentFixture<TicTacToeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TicTacToeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicTacToeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('buttonDisabled should return true if button is x or o', () => {
    component.gameBoard[0][0] = 'x';
    component.gameBoard[0][1] = 'o';
    expect(component.buttonDisabled(0, 0)).toBeTruthy();
    expect(component.buttonDisabled(0, 1)).toBeTruthy();
  });

  it('buttonDisabled should return false if button is empty (has not been clicked yet)', () => {
    expect(component.buttonDisabled(0, 0)).toBeFalsy(); //default game borad is unclicked onInit, so can just validate
  });

  fit('onButtonClick should update buttons and board correctly based on whichever player turn it is', () => {
    var button = {
      textContent: ""
    };
    component.playerTurn = "x";

    component.onButtonClick(button, 0, 1);
    expect(component.gameBoard[0][1]).toEqual("x");
    expect(button.textContent).toEqual("x");
    expect(component.gameStatus).toEqual("Player o's turn");
    expect(component.playerTurn).toEqual("o");

    button = {
      textContent: ""
    };
    component.playerTurn = "o";

    component.onButtonClick(button, 0, 2);
    expect(component.gameBoard[0][2]).toEqual("o");
    expect(button.textContent).toEqual("o");
    expect(component.gameStatus).toEqual("Player x's turn");
    expect(component.playerTurn).toEqual("x");
  });
});
