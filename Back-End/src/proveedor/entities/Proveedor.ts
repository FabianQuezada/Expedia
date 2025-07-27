import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Descuento } from "../../descuento/entities/Descuento";
import { Experiencia } from "../../experiencia/entities/Experiencia";

@Entity("proveedor", { schema: "nest_bd" })
export class Proveedor {
  @PrimaryGeneratedColumn({ name: "ID_Proveedor" })
  idProveedor: number;

  @Column("varchar", { name: "Nombre_Empresa", length: 100 })
  nombreEmpresa: string;

  @Column("text", { name: "Descripcion" })
  descripcion: string;

  @Column("decimal", { name: "Calificacion", precision: 3, scale: 2 })
  calificacion: string;

  @Column("varchar", { name: "Correo", length: 100 })
  correo: string;

  @Column("varchar", { name: "Contraseña", length: 255 })
  contraseña: string;

  @CreateDateColumn({ name: "Fecha_Registro", type: "timestamp" })
  fechaRegistro: Date;

  @OneToMany(() => Descuento, (descuento) => descuento.idProveedor2)
  descuentos: Descuento[];

  @OneToMany(() => Experiencia, (experiencia) => experiencia.idProveedor2)
  experiencias: Experiencia[];
}
