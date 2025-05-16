import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reserva } from "../../reserva/entities/reserva.entity"

@Index("Id_Reserva", ["idReserva", "idUsuario"], {})
@Entity("cancelacion", { schema: "nest_bd" })
export class Cancelacion {
  @PrimaryGeneratedColumn({ name: "ID_Cancelacion" })
  idCancelacion: number;

  @Column("text", { name: "Motivo" })
  motivo: string;

  @Column("date", { name: "Fecha_Cancelacion" })
  fechaCancelacion: Date;

  @Column("int", { name: "Id_Reserva" })
  idReserva: number;

  @Column("int", { name: "ID_Usuario" })
  idUsuario: number;

  @ManyToOne(() => Reserva, (reserva) => reserva.cancelacions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([
    { name: "Id_Reserva", referencedColumnName: "idReserva" },
    { name: "ID_Usuario", referencedColumnName: "idUsuario" },
  ])
  reserva: Reserva;
}
