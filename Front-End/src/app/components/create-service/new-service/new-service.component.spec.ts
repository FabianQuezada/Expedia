import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewServiceComponent } from './new-service.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FechaPrecio } from 'src/app/models/fecha-precio';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-image-upload',
  template: '<button (click)="emitirImagenes()">Emitir Imágenes</button>'
})
class MockImageUploadComponent {
  @Output() imagenesCambiadas = new EventEmitter<(string | null)[]>();

  emitirImagenes() {
    this.imagenesCambiadas.emit(['img1.png', 'img2.png']);
  }
}

@Component({
  selector: 'app-service-detail-upload',
  template: '<button (click)="emitirExperiencia()">Emitir Experiencia</button>'
})

class MockServiceDetailUploadComponent {
  @Output() experienciaCambiada = new EventEmitter<any>();

  emitirExperiencia() {
    this.experienciaCambiada.emit({
      titulo: 'Excursión',
      descripcion: 'Día completo',
      precio: 25000,
      direccion: 'Santiago'
    });
  }
}

@Component({
  selector: 'app-service-add-dates',
  template: '<button (click)="emitirFechas()">Emitir Fechas</button>'
})
class MockServiceAddDatesComponent {
  @Output() fechasCambiadas = new EventEmitter<FechaPrecio[]>();

  emitirFechas() {
    this.fechasCambiadas.emit([
      { fecha: '2024-12-01', precio: 30000 },
      { fecha: '2024-12-15', precio: 32000 }
    ]);
  }
}

describe('NewServiceComponent', () => {
  let component: NewServiceComponent;
  let fixture: ComponentFixture<NewServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NewServiceComponent,
        MockImageUploadComponent,
        MockServiceDetailUploadComponent,
        MockServiceAddDatesComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería recibir imágenes desde el componente hijo', () => {
    const mockBtn = fixture.debugElement.query(By.css('app-image-upload button'));
    mockBtn.triggerEventHandler('click');
    fixture.detectChanges();
    console.log('Test de recibir imagenes ejecutado');

    expect(component.imagenes).toEqual(['img1.png', 'img2.png']);
  });

  it('debería recibir datos de experiencia desde el componente hijo', () => {
    const mockBtn = fixture.debugElement.query(By.css('app-service-detail-upload button'));
    mockBtn.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.experiencia).toEqual({
      titulo: 'Excursión',
      descripcion: 'Día completo',
      precio: 25000,
      direccion: 'Santiago'
    });
    console.log('Test de recibir datos de experiencia ejecutado');

  });

  it('debería recibir fechas desde el componente hijo', () => {
    const mockBtn = fixture.debugElement.query(By.css('app-service-add-dates button'));
    mockBtn.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.fechasServicio.length).toBe(2);
    expect(component.fechasServicio[0].fecha).toBe('2024-12-01');
    console.log('Test de recibir fechas ejecutado');
  });
});
