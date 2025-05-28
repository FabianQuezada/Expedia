import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Experiencia } from "../../experiencia/entities/experiencia.entity";
import { Descuento } from "../../descuento/entities/descuento.entity";
import { Reserva } from "../../reserva/entities/reserva.entity";

@Index("ID_Experiencia", ["idExperiencia"], {})
@Index("ID_Descuento", ["idDescuento"], {})
@Index(['fecha', 'idExperiencia'], { unique: true })
@Entity("fechas_experiencia", { schema: "nest_bd" })
export class FechasExperiencia {
  @Column("date", { primary: true, name: "Fecha" })
  fecha: Date;

  @Column("int", { primary: true, name: "ID_Experiencia" })
  idExperiencia: number;

  @Column("decimal", { name: "Precio", precision: 10, scale: 2 })
  precio: number;

  @Column("int", { name: "Vistas" })
  vistas: number;

  @Column("int", { name: "ID_Descuento", nullable: true })
  idDescuento: number | null;

  @ManyToOne(
    () => Experiencia,
    (experiencia) => experiencia.fechasExperiencias,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "ID_Experiencia", referencedColumnName: "idExperiencia" },
  ])
  idExperiencia2: Experiencia;

  @ManyToOne(() => Descuento, (descuento) => descuento.fechasExperiencias, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ID_Descuento", referencedColumnName: "idDescuento" }])
  idDescuento2: Descuento;

  @OneToMany(() => Reserva, (reserva) => reserva.fechasExperiencia)
  reservas: Reserva[];
}
