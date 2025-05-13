import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Reserva } from "../../reserva/entities/Reserva";

@Index("Id_Reserva", ["idReserva", "idUsuario"], {})
@Entity("reprogramacion", { schema: "nest_bd" })
export class Reprogramacion {
  @Column("int", { primary: true, name: "Id_Reprogramacion" })
  idReprogramacion: number;

  @Column("text", { name: "Motivo" })
  motivo: string;

  @Column("date", { name: "Nueva_Fecha" })
  nuevaFecha: string;

  @Column("int", { name: "Id_Reserva" })
  idReserva: number;

  @Column("int", { name: "ID_Usuario" })
  idUsuario: number;

  @ManyToOne(() => Reserva, (reserva) => reserva.reprogramacions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([
    { name: "Id_Reserva", referencedColumnName: "idReserva" },
    { name: "ID_Usuario", referencedColumnName: "idUsuario" },
  ])
  reserva: Reserva;
}
