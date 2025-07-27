import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardActividadComponent } from './card-actividad.component';

describe('CardActividadComponent', () => {
  let component: CardActividadComponent;
  let fixture: ComponentFixture<CardActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardActividadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
