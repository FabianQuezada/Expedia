import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVueloComponent } from './card-vuelo.component';

describe('CardVueloComponent', () => {
  let component: CardVueloComponent;
  let fixture: ComponentFixture<CardVueloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardVueloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardVueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
