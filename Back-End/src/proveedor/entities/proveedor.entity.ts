import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Descuento } from "../../descuento/entities/descuento.entity";
import { Experiencia } from "../../experiencia/entities/experiencia.entity";

@Entity("proveedor", { schema: "nest_bd" })
export class Proveedor {
  @PrimaryGeneratedColumn({ name: "ID_Proveedor" })
  idProveedor: number;

  @Column("varchar", { name: "Nombre_Empresa", length: 100 })
  nombreEmpresa: string;

  @Column("text", { name: "Descripcion" })
  descripcion: string;

  @Column("decimal", { name: "Calificacion", precision: 3, scale: 2, default: 5.0})
  calificacion: string;

  @Column("varchar", { name: "Correo", length: 100, unique: true})
  correo: string;

  @Column("varchar", { name: "Contraseña", length: 255, select: false })
  contraseña: string;

  @CreateDateColumn({ name: "Fecha_Registro", type: "timestamp" })
  fechaRegistro: Date;

  @OneToMany(() => Descuento, (descuento) => descuento.idProveedor2)
  descuentos: Descuento[];

  @OneToMany(() => Experiencia, (experiencia) => experiencia.proveedor)
  experiencias: Experiencia[];
}
