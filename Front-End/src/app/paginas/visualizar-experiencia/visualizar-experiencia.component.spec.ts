import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarExperienciaComponent } from './visualizar-experiencia.component';

describe('VisualizarExperienciaComponent', () => {
  let component: VisualizarExperienciaComponent;
  let fixture: ComponentFixture<VisualizarExperienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarExperienciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarExperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
