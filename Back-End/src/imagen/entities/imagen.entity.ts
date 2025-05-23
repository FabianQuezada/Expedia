import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Experiencia } from "../../experiencia/entities/experiencia.entity";

@Entity("imagen", { schema: "nest_bd" })
export class Imagen {
  @PrimaryGeneratedColumn({ name: "ID_Imagen" })
  idImagen: number;

  @Column({ name: 'ID_Experiencia' })
  idExperiencia: number; 

  @ManyToOne(() => Experiencia, experiencia => experiencia.imagenes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ID_Experiencia' })
  experiencia: Experiencia;

  @Column({ name: 'URL' })
  url: string;
}