import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTacToeComponent } from './tic-tac-toe.component';

describe('TicTacToeComponent', () => {
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
});
