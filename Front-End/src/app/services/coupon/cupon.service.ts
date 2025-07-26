import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cupon } from 'src/app/models/cupon.model';

@Injectable({
  providedIn: 'root'
})
export class CuponService {

  private readonly cuponesEmpresa: Cupon[] = [
    new Cupon(1, '10% Descuento', 'DESC10', new Date('2025-06-01'), new Date('2026-06-10'), 10, 'Descuento del 10% en toda la tienda'),
    new Cupon(2, '20% en electrónica', 'ELEC30', new Date('2025-06-05'), new Date('2025-06-15'), 20, 'Solo para productos electrónicos', 100),
    new Cupon(3, '5% en tienda', 'TIENDA5', new Date('2025-06-01'), new Date('2026-06-10'), 5, 'Descuento en toda la tienda'),
    new Cupon(4, '10% en electrónica', 'ELEC60', new Date('2025-06-05'), new Date('2025-06-15'), 10, 'Solo para productos electrónicos', 100),
  ];

  private cuponesUsuario: Cupon[] = this.cargarCuponesDesdeLocalStorage();

  private cuponesUsuario$ = new BehaviorSubject<Cupon[]>(this.cuponesUsuario);
  private cuponesEmpresa$ = new BehaviorSubject<Cupon[]>(this.cuponesEmpresa);

  constructor() {}

  // Obtener cupones disponibles de la empresa
  getCuponesEmpresa(): Observable<Cupon[]> {
    return this.cuponesEmpresa$.asObservable();
  }

  // Obtener cupones del usuario
  getCuponesUsuario(): Observable<Cupon[]> {
    return this.cuponesUsuario$.asObservable();
  }

  // Agregar cupón al usuario 
  agregarCuponAlUsuario(cupon: Cupon): void {
    const actual = this.cuponesUsuario$.getValue();
    const actualizado = [...actual, cupon];
    this.cuponesUsuario$.next(actualizado);              
    this.guardarCuponesEnLocalStorage(actualizado);     
  }

  private guardarCuponesEnLocalStorage(cupones: Cupon[]): void {
    const cuponesString = JSON.stringify(
      cupones.map(c => ({
        ...c,
        fechaInicio: c.fechaInicio.toISOString(),
        fechaFinal: c.fechaFinal.toISOString()
      }))
    );
    localStorage.setItem('cuponesUsuario', cuponesString);
  }

  private cargarCuponesDesdeLocalStorage(): Cupon[] {
    const data = localStorage.getItem('cuponesUsuario');
    if (!data) return [];

    const raw = JSON.parse(data);
    return raw.map((c: any) =>
      new Cupon(
        c.id,
        c.titulo,
        c.code,
        new Date(c.fechaInicio),
        new Date(c.fechaFinal),
        c.montoDescuento,
        c.descripcion,
        c.minPurchase
      )
    );
  }
}
