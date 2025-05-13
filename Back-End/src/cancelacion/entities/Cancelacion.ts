import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Reserva } from "../../reserva/entities/Reserva"

@Index("Id_Reserva", ["idReserva", "idUsuario"], {})
@Entity("cancelacion", { schema: "nest_bd" })
export class Cancelacion {
  @Column("int", { primary: true, name: "ID_Cancelacion" })
  idCancelacion: number;

  @Column("text", { name: "Motivo" })
  motivo: string;

  @Column("date", { name: "Fecha_Cancelacion" })
  fechaCancelacion: string;

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
