import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Descuento } from "../../descuento/entities/Descuento";
import { Experiencia } from "../../experiencia/entities/Experiencia";
import { Usuario } from "../../usuario/entities/Usuario";

@Index("ID_Usuario", ["idUsuario"], {})
@Entity("proveedor", { schema: "nest_bd" })
export class Proveedor {
  @Column("int", { primary: true, name: "ID_Proveedor" })
  idProveedor: number;

  @Column("varchar", { name: "Nombre_Empresa", length: 100 })
  nombreEmpresa: string;

  @Column("text", { name: "Descripcion" })
  descripcion: string;

  @Column("decimal", { name: "Calificacion", precision: 3, scale: 2 })
  calificacion: string;

  @Column("int", { name: "ID_Usuario" })
  idUsuario: number;

  @OneToMany(() => Descuento, (descuento) => descuento.idProveedor2)
  descuentos: Descuento[];

  @OneToMany(() => Experiencia, (experiencia) => experiencia.idProveedor2)
  experiencias: Experiencia[];

  @ManyToOne(() => Usuario, (usuario) => usuario.proveedors, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ID_Usuario", referencedColumnName: "idUsuario" }])
  idUsuario2: Usuario;
}
