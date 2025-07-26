import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpOtherComponent } from './exp-other.component';

describe('ExpOtherComponent', () => {
  let component: ExpOtherComponent;
  let fixture: ComponentFixture<ExpOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpOtherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
