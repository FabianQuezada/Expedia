import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateUtilsService {
  constructor() {}

  getFechaCorta(fechaInput: string | Date): string {
    const fecha = new Date(fechaInput);
    const fechaUTC = new Date(
      fecha.getUTCFullYear(),
      fecha.getUTCMonth(),
      fecha.getUTCDate()
    );

    return fechaUTC.toLocaleDateString('es-CL', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  }

  getFechaLarga(fecha: Date): string {
    const opciones: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    // Se asegura de capitalizar la primera letra (ej. "jueves" → "Jueves")
    const fechaFormateada = new Date(fecha).toLocaleDateString(
      'es-CL',
      opciones
    );
    return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
  }

  getHora(fecha: string | Date): string {
    const dateObj = new Date(fecha);
    return dateObj.toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  parseLocalDate(fechaStr: string): Date {
    const [year, month, day] = fechaStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  esMismaFecha(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }
}
