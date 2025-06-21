import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  constructor() {}

  crearReserva(resumen: any): Observable<{ reserva_id: number }> {
    console.log('📝 creando reserva:', resumen);
    return of({ reserva_id: 123 }); // Simulación
  }

  crearPago(datos: any): Observable<{ success: boolean }> {
    console.log('💳 creando pago:', datos);
    return of({ success: true }); // Simulación
  }
}
