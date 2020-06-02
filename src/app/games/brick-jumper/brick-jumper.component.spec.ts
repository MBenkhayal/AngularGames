import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrickJumperComponent } from './brick-jumper.component';

describe('BrickJumperComponent', () => {
  let component: BrickJumperComponent;
  let fixture: ComponentFixture<BrickJumperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrickJumperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrickJumperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
