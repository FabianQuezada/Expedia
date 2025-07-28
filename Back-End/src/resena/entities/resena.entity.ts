import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Experiencia } from "../../experiencia/entities/experiencia.entity";

@Index("ID_Usuario", ["idUsuario"], {})
@Index("ID_Experiencia", ["idExperiencia"], {})
@Unique(["idResena", "idUsuario"])
@Entity("resena", { schema: "nest_bd" })
export class Resena {
  @PrimaryGeneratedColumn("increment", { name: "ID_Resena" })
  idResena: number;

  @Column("int", { name: "ID_Usuario" })
  idUsuario: number;

  @Column("decimal", { name: "Puntuacion", precision: 3, scale: 2 })
  puntuacion: number;

  @Column("text", { name: "Comentario" })
  comentario: string;

  @Column("date", { name: "Fecha" })
  fecha: Date;

  @Column("int", { name: "ID_Experiencia" })
  idExperiencia: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.resenas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ID_Usuario", referencedColumnName: "idUsuario" }])
  idUsuario2: Usuario;

  @ManyToOne(() => Experiencia, (experiencia) => experiencia.resenas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([
    { name: "ID_Experiencia", referencedColumnName: "idExperiencia" },
  ])
  idExperiencia2: Experiencia;
}
