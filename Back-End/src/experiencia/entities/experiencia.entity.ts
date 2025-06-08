import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Proveedor } from "../../proveedor/entities/proveedor.entity";
import { FechasExperiencia } from "../../fechas-experiencia/entities/fechas-experiencia.entity";
import { Reseña } from "../../reseña/entities/reseña.entity";
import { Imagen } from "src/imagen/entities/imagen.entity";
import { Caracteristica } from "src/caracteristica/entities/caracteristica.entity";

@Index("ID_Proveedor", ["idProveedor"], {})
@Entity("experiencia", { schema: "nest_bd" })
export class Experiencia {
  @PrimaryGeneratedColumn({ name: "ID_Experiencia" })
  idExperiencia: number;

  @Column("varchar", { name: "Titulo", length: 100 })
  titulo: string;

  @Column("text", { name: "Descripcion" })
  descripcion: string;

  @Column("varchar", { name: "Ubicacion", length: 150 })
  ubicacion: string;

  @Column("varchar", { name: "Estado", length: 20 })
  estado: string;

  @Column("varchar", { name: "Categoria", length: 50 })
  categoria: string;

  @Column("int", { name: "Cupos_Disponibles" })
  cuposDisponibles: number;

  @Column("simple-array", { name: "Datos_Generales" })
  datosGenerales: string[];

  @Column("int", { name: "ID_Proveedor" })
  idProveedor: number;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.experiencias, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ID_Proveedor", referencedColumnName: "idProveedor" }])
  proveedor: Proveedor;

  @OneToMany(
    () => FechasExperiencia,
    (fechasExperiencia) => fechasExperiencia.idExperiencia2
  )
  fechasExperiencias: FechasExperiencia[];

  @OneToMany(() => Reseña, (reseña) => reseña.idExperiencia2)
  reseñas: Reseña[];

  @OneToMany(() => Imagen, (imagen) => imagen.experiencia, { cascade: true })
  imagenes: Imagen[];

  @ManyToMany(() => Caracteristica, (caracteristica) => caracteristica.experiencias, {
  cascade: true,
  })
  
  @JoinTable({
    name: "tiene",
    joinColumn: {
      name: "ID_Experiencia",
      referencedColumnName: "idExperiencia",
    },
    inverseJoinColumn: {
      name: "ID_Caracteristica",
      referencedColumnName: "idCaracteristica",
    },
  })

  caracteristicas: Caracteristica[];
}
