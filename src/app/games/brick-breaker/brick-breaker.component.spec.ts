import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrickBreakerComponent } from './brick-breaker.component';

describe('BrickBreakerComponent', () => {
  let component: BrickBreakerComponent;
  let fixture: ComponentFixture<BrickBreakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrickBreakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrickBreakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
