import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpDescComponent } from './exp-desc.component';

describe('ExpDescComponent', () => {
  let component: ExpDescComponent;
  let fixture: ComponentFixture<ExpDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpDescComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
