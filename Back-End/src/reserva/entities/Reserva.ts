import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Cancelacion } from "../../cancelacion/entities/Cancelacion";
import { Pago } from "../../pago/entities/Pago";
import { Reprogramacion } from "../../reprogramacion/entities/Reprogramacion";
import { Usuario } from "../../usuario/entities/Usuario"
import { FechasExperiencia } from "../../fechas-experiencia/entities/FechasExperiencia";

@Index("ID_Usuario", ["idUsuario"], {})
@Index("Fecha", ["fecha", "idExperiencia"], {})
@Entity("reserva", { schema: "nest_bd" })
export class Reserva {
  @Column("int", { primary: true, name: "Id_Reserva" })
  idReserva: number;

  @Column("int", { primary: true, name: "ID_Usuario" })
  idUsuario: number;

  @Column("date", { name: "Fecha_Reserva" })
  fechaReserva: string;

  @Column("int", { name: "Cantidad_Personas" })
  cantidadPersonas: number;

  @Column("varchar", { name: "Estado", length: 20 })
  estado: string;

  @Column("decimal", { name: "Total_Pago", precision: 10, scale: 2 })
  totalPago: string;

  @Column("date", { name: "Fecha" })
  fecha: string;

  @Column("int", { name: "ID_Experiencia" })
  idExperiencia: number;

  @OneToMany(() => Cancelacion, (cancelacion) => cancelacion.reserva)
  cancelacions: Cancelacion[];

  @OneToMany(() => Pago, (pago) => pago.reserva)
  pagos: Pago[];

  @OneToMany(() => Reprogramacion, (reprogramacion) => reprogramacion.reserva)
  reprogramacions: Reprogramacion[];

  @ManyToOne(() => Usuario, (usuario) => usuario.reservas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ID_Usuario", referencedColumnName: "idUsuario" }])
  idUsuario2: Usuario;

  @ManyToOne(
    () => FechasExperiencia,
    (fechasExperiencia) => fechasExperiencia.reservas,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "Fecha", referencedColumnName: "fecha" },
    { name: "ID_Experiencia", referencedColumnName: "idExperiencia" },
  ])
  fechasExperiencia: FechasExperiencia;
}
