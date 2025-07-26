export class Cupon {
  constructor(
    public id: number,
    public titulo: string,
    public code: string,
    public fechaInicio: Date,  // Formato "dd/MM/yyyy"
    public fechaFinal: Date,   
    public montoDescuento: number,
    public descripcion: string,
    public minPurchase?: number
  ) {}

esActiva(): boolean {
  const hoy = new Date(); // Fecha actual
  return this.fechaInicio <= hoy && hoy <= this.fechaFinal; 
}

}