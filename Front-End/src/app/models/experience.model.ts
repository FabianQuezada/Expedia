export class Experience {
  constructor(
    public id: number,
    public imagen: string,
    public titulo: string,
    public fecha: string,
    public precio: number,
    public valoracion: number,
    public cantidadValoracion: number,
    public descripcion?: string
  ) {}

  esActiva(): boolean {
    const hoy = new Date();
    const [day, month, year] = this.fecha.split('/').map(Number);
    const fechaExp = new Date(year, month - 1, day);

    hoy.setHours(0, 0, 0, 0);
    fechaExp.setHours(0, 0, 0, 0);

    return fechaExp >= hoy;
  }
}
