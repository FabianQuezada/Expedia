import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  constructor() {}

  crearReserva(resumen: any): Observable<{ reserva_id: number }> {
    return of({ reserva_id: 123 }); // Simulación
  }

  crearPago(datos: any): Observable<{ success: boolean }> {
    return of({ success: true }); // Simulación
  }
}
