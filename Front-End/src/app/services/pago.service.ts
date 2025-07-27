import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreatePagoDto } from '../models/createPago'; // Ajusta ruta si es distinta
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PagoService {
  private baseUrl = 'https://expedia-3kpb.onrender.com/pago'; // Ajusta si tu ruta es diferente

  constructor(private http: HttpClient) {}

  crearPago(pago: CreatePagoDto): Observable<{ success: boolean }> {
    console.log('📡 Enviando pago al backend:', pago);
    return this.http.post<{ success: boolean }>(this.baseUrl, pago);
  }
}