import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reserva } from "../../reserva/entities/reserva.entity";
import { EstadoPago } from "src/common/enums/estadoPago.enum";
import { MetodoPago } from "src/common/enums/metodoPago.enum";

@Index("Id_Reserva", ["idReserva", "idUsuario"], {})
@Entity("pago", { schema: "nest_bd" })
export class Pago {
  @PrimaryGeneratedColumn({ name: "Id_Pago" })
  idPago: number;

  @Column({ type: 'enum', enum: MetodoPago, name: "Metodo"})
  metodo: string;

  @Column({ type: 'enum', name: "Estado_Pago", enum: EstadoPago, default: EstadoPago.PENDIENTE })
  estadoPago: EstadoPago;

  @CreateDateColumn({ name: "Fecha_Pago", type: "timestamp", precision: 0 })
  fechaPago: Date;

  @Column("decimal", { name: "Monto", precision: 10, scale: 2 })
  monto: number;

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

  @DeleteDateColumn()
    deleteAt: Date;
}
