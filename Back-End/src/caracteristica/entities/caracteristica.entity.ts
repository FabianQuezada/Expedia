import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Experiencia } from "../../experiencia/entities/experiencia.entity";

@Entity("caracteristica", { schema: "nest_bd" })
export class Caracteristica {
  @PrimaryGeneratedColumn({ name: "ID_Caracteristica" })
  idCaracteristica: number;

  @Column("text", { name: "Descripcion" })
  descripcion: string;

  @ManyToMany(() => Experiencia, (experiencia) => experiencia.caracteristicas)
  experiencias: Experiencia[];
}