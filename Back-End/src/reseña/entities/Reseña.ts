import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Usuario } from "../../usuario/entities/Usuario";
import { Experiencia } from "../../experiencia/entities/Experiencia";

@Index("ID_Usuario", ["idUsuario"], {})
@Index("ID_Experiencia", ["idExperiencia"], {})
@Entity("reseña", { schema: "nest_bd" })
export class Reseña {
  @Column("int", { primary: true, name: "ID_Reserva" })
  idReseña: number;

  @Column("int", { primary: true, name: "ID_Usuario" })
  idUsuario: number;

  @Column("decimal", { name: "Puntuacion", precision: 3, scale: 2 })
  puntuacion: string;

  @Column("text", { name: "Comentario" })
  comentario: string;

  @Column("date", { name: "Fecha" })
  fecha: Date;

  @Column("int", { name: "ID_Experiencia" })
  idExperiencia: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.reseñas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ID_Usuario", referencedColumnName: "idUsuario" }])
  idUsuario2: Usuario;

  @ManyToOne(() => Experiencia, (experiencia) => experiencia.reseñas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([
    { name: "ID_Experiencia", referencedColumnName: "idExperiencia" },
  ])
  idExperiencia2: Experiencia;
}
