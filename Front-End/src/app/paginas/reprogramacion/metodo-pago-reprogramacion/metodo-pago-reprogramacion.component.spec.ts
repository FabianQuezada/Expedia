import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoPagoReprogramacionComponent } from './metodo-pago-reprogramacion.component';

describe('MetodoPagoReprogramacionComponent', () => {
  let component: MetodoPagoReprogramacionComponent;
  let fixture: ComponentFixture<MetodoPagoReprogramacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetodoPagoReprogramacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodoPagoReprogramacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
