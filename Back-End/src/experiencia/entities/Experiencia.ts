import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Proveedor } from "../../proveedor/entities/Proveedor";
import { FechasExperiencia } from "../../fechas-experiencia/entities/FechasExperiencia";
import { Reseña } from "../../reseña/entities/Reseña";

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

  @Column("text", { name: "Imagenes" })
  imagenes: string;

  @Column("varchar", { name: "Estado", length: 20 })
  estado: string;

  @Column("varchar", { name: "Categoria", length: 50 })
  categoria: string;

  @Column("int", { name: "Cupos_Disponibles" })
  cuposDisponibles: number;

  @Column("int", { name: "ID_Proveedor" })
  idProveedor: number;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.experiencias, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ID_Proveedor", referencedColumnName: "idProveedor" }])
  idProveedor2: Proveedor;

  @OneToMany(
    () => FechasExperiencia,
    (fechasExperiencia) => fechasExperiencia.idExperiencia2
  )
  fechasExperiencias: FechasExperiencia[];

  @OneToMany(() => Reseña, (reseña) => reseña.idExperiencia2)
  reseñas: Reseña[];
}
