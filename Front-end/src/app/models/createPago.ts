export interface CreatePagoDto {
  metodo: 'credito' | 'debito' | 'paypal';
  monto: number;
  idReserva: number;
  idUsuario: number;
}
