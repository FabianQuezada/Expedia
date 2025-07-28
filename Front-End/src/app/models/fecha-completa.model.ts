export interface FechaCompleta {
    id?: number;
    fecha: string; // o Date si así viene
    precio: number;
    descuento?: number;
    idExperiencia: number;
    precioConDescuento?: number;
}
