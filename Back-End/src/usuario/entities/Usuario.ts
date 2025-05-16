import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Descuento } from "../../descuento/entities/Descuento";
import { Notificacion } from "../../notificacion/entities/Notificacion";
import { Reseña } from "../../reseña/entities/Reseña";
import { Reserva } from "../../reserva/entities/Reserva";

@Entity("usuario", { schema: "nest_bd" })
export class Usuario {
  @PrimaryGeneratedColumn( { name: "ID_Usuario" })
  idUsuario: number;

  @Column("varchar", { name: "Nombre", length: 100 })
  nombre: string;

  @Column("varchar", { name: "Apellido", length: 100 })
  apellido: string;

  @Column("varchar", { name: "Genero", length: 10 })
  genero: string;

  @CreateDateColumn({ name: "Fecha_Nacimiento", type: "date" })
  fechaNacimiento: Date;

  @Column("varchar", { name: "Numero_telefono", length: 15 })
  numeroTelefono: string;

  @Column("varchar", { name: "Correo", length: 100 })
  correo: string;

  @Column("varchar", { name: "Contraseña", length: 255 })
  contraseña: string;

  @CreateDateColumn({ name: "Fecha_Registro", type: "timestamp" })
  fechaRegistro: Date;

  @ManyToMany(() => Descuento, (descuento) => descuento.usuarios)
  @JoinTable({
    name: "posee",
    joinColumns: [{ name: "ID_Usuario", referencedColumnName: "idUsuario" }],
    inverseJoinColumns: [
      { name: "ID_Descuento", referencedColumnName: "idDescuento" },
    ],
    schema: "nest_bd",
  })
  descuentos: Descuento[];

  @ManyToMany(() => Notificacion, (notificacion) => notificacion.usuarios)
  notificacions: Notificacion[];

  @OneToMany(() => Reseña, (reseña) => reseña.idUsuario2)
  reseñas: Reseña[];

  @OneToMany(() => Reserva, (reserva) => reserva.idUsuario2)
  reservas: Reserva[];
}
