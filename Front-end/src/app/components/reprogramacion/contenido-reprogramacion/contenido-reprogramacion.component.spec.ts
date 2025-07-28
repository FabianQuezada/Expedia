import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoReprogramacionComponent } from './contenido-reprogramacion.component';

describe('ContenidoReprogramacionComponent', () => {
  let component: ContenidoReprogramacionComponent;
  let fixture: ComponentFixture<ContenidoReprogramacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenidoReprogramacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoReprogramacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
