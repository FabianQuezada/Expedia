import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoPagoComponent } from './contenido-pago.component';

describe('ContenidoPagoComponent', () => {
  let component: ContenidoPagoComponent;
  let fixture: ComponentFixture<ContenidoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenidoPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
