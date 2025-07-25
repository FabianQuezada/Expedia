import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Proveedor } from "../../proveedor/entities/proveedor.entity";
import { FechasExperiencia } from "../../fechas-experiencia/entities/fechas-experiencia.entity";
import { Notificacion } from "../../notificacion/entities/notificacion.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Index("ID_Proveedor", ["idProveedor"], {})
@Entity("descuento", { schema: "nest_bd" })
export class Descuento {
  @PrimaryGeneratedColumn({ name: "ID_Descuento" })
  idDescuento: number;

  @Column("date", { name: "Fecha_creacion" })
  fechaCreacion: Date;

  @Column("int", { name: "Porcentaje" })
  porcentaje: number;

  @Column("text", { name: "Descripcion" })
  descripcion: string;

  @Column("varchar", { name: "Estado", length: 20 })
  estado: string;

  @Column("int", { name: "ID_Proveedor" })
  idProveedor: number;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.descuentos, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ID_Proveedor", referencedColumnName: "idProveedor" }])
  idProveedor2: Proveedor;

  @OneToMany(
    () => FechasExperiencia,
    (fechasExperiencia) => fechasExperiencia.idDescuento2
  )
  fechasExperiencias: FechasExperiencia[];

  @OneToMany(() => Notificacion, (notificacion) => notificacion.idDescuento2)
  notificacions: Notificacion[];

  @ManyToMany(() => Usuario, (usuario) => usuario.descuentos)
  usuarios: Usuario[];
}
