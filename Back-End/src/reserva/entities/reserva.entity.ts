import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cancelacion } from "../../cancelacion/entities/cancelacion.entity";
import { Pago } from "../../pago/entities/pago.entity";
import { Reprogramacion } from "../../reprogramacion/entities/reprogramacion.entity";
import { Usuario } from "../../usuario/entities/usuario.entity"
import { FechasExperiencia } from "../../fechas-experiencia/entities/fechas-experiencia.entity";
import { EstadoReserva } from "src/common/enums/estadoReserva.enum";

@Index("ID_Usuario", ["idUsuario"], {})
@Index("Fecha", ["fecha", "idExperiencia"], {})
@Entity("reserva", { schema: "nest_bd" })
export class Reserva {
  @Column("int", { primary: true, name: "Id_Reserva" })
  idReserva: number;

  @Column("int", { primary: true, name: "ID_Usuario" })
  idUsuario: number;

  @Column({ type: "date", name: "Fecha_Reserva" })
  fechaReserva: Date;

  @Column("int", { name: "Cantidad_Personas" })
  cantidadPersonas: number;

  @Column({ type: 'enum', enum: EstadoReserva, name: "Estado" })
  estado: string;

  @Column("decimal", { name: "Total_Pago", precision: 10, scale: 2 })
  totalPago: number;

  @Column("date", { name: "Fecha" })
  fecha: Date;

  @Column("int", { name: "ID_Experiencia" })
  idExperiencia: number;

  @DeleteDateColumn()
    deleteAt: Date;

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
