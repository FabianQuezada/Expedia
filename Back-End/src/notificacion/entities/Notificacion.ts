import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Descuento } from "../../descuento/entities/Descuento";
import { Usuario } from "../../usuario/entities/Usuario";

@Index("ID_Descuento", ["idDescuento"], {})
@Entity("notificacion", { schema: "nest_bd" })
export class Notificacion {
  @Column("int", { primary: true, name: "ID_Notificaciones" })
  idNotificaciones: number;

  @Column("varchar", { name: "Titulo", length: 100 })
  titulo: string;

  @Column("text", { name: "Mensaje" })
  mensaje: string;

  @Column("date", { name: "Fecha_envio" })
  fechaEnvio: string;

  @Column("varchar", { name: "Estado", length: 20 })
  estado: string;

  @Column("int", { name: "ID_Descuento" })
  idDescuento: number;

  @ManyToOne(() => Descuento, (descuento) => descuento.notificacions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ID_Descuento", referencedColumnName: "idDescuento" }])
  idDescuento2: Descuento;

  @ManyToMany(() => Usuario, (usuario) => usuario.notificacions)
  @JoinTable({
    name: "recibe",
    joinColumns: [
      { name: "ID_Notificaciones", referencedColumnName: "idNotificaciones" },
    ],
    inverseJoinColumns: [
      { name: "ID_Usuario", referencedColumnName: "idUsuario" },
    ],
    schema: "nest_bd",
  })
  usuarios: Usuario[];
}
