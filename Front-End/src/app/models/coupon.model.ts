export class Coupon {
  constructor(
    public id: number,
    public titulo: string,
    public code: string,
    public fechaInicio: string,  // Formato "dd/MM/yyyy"
    public fechaFinal: string,   
    public montoDescuento: number,
    public descripcion: string,
    public minPurchase?: number
  ) {}

  // Convierte fecha "dd/MM/yyyy" en objeto Date válido
  private parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  // Verifica si el cupón está activo actualmente
  esActiva(): boolean {
    const hoy = new Date();
    return this.parseDate(this.fechaInicio)<= hoy && hoy <= this.parseDate(this.fechaFinal);
  }
}
