import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpDispComponent } from './exp-disp.component';

describe('ExpDispComponent', () => {
  let component: ExpDispComponent;
  let fixture: ComponentFixture<ExpDispComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpDispComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpDispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
