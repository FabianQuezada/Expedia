import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Reserva } from "../../reserva/entities/Reserva";

@Index("Id_Reserva", ["idReserva", "idUsuario"], {})
@Entity("pago", { schema: "nest_bd" })
export class Pago {
  @Column("int", { primary: true, name: "Id_Pago" })
  idPago: number;

  @Column("varchar", { name: "Metodo", length: 50 })
  metodo: string;

  @Column("varchar", { name: "Estado_Pago", length: 20 })
  estadoPago: string;

  @Column("date", { name: "Fecha_Pago" })
  fechaPago: string;

  @Column("decimal", { name: "Monto", precision: 10, scale: 2 })
  monto: string;

  @Column("int", { name: "Id_Reserva" })
  idReserva: number;

  @Column("int", { name: "ID_Usuario" })
  idUsuario: number;

  @ManyToOne(() => Reserva, (reserva) => reserva.pagos, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([
    { name: "Id_Reserva", referencedColumnName: "idReserva" },
    { name: "ID_Usuario", referencedColumnName: "idUsuario" },
  ])
  reserva: Reserva;
}
