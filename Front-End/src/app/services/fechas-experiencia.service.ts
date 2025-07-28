import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fecha } from '../models/Fecha';
import { FechaCompleta } from '../models/fecha-completa.model';
import { environment } from 'src/enviroments/enviroment';


@Injectable({
    providedIn: 'root'
})
export class FechasExperienciaService {


    private baseUrl = `${environment.apiUrl}/fechas-experiencia`;


    constructor(private http: HttpClient) {}


    agregarFechas(idExperiencia: number, fechas: Fecha[]): Observable<FechaCompleta[]> {
        return this.http.post<FechaCompleta[]>(`${this.baseUrl}/agregar-fechas/${idExperiencia}`, fechas);
    }


    getFechasConDescuento(): Observable<FechaCompleta[]> {
        return this.http.get<FechaCompleta[]>(`${this.baseUrl}/descuentos`);
    }


    forzarDescuento(): Observable<any> {
        return this.http.get(`${this.baseUrl}/descuento-prueba`);
    }


    getTodas(): Observable<FechaCompleta[]> {
        return this.http.get<FechaCompleta[]>(`${this.baseUrl}/all`);
    }


    getPorFechaYExperiencia(fecha: string, idExperiencia: number): Observable<FechaCompleta> {
        return this.http.get<FechaCompleta>(`${this.baseUrl}/${fecha}/${idExperiencia}`);
    }


    update(id: number, data: Partial<FechaCompleta>): Observable<any> {
        return this.http.patch(`${this.baseUrl}/${id}`, data);
    }


    delete(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}
