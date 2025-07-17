import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHospedajeComponent } from './card-hospedaje.component';

describe('CardHospedajeComponent', () => {
  let component: CardHospedajeComponent;
  let fixture: ComponentFixture<CardHospedajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardHospedajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardHospedajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
