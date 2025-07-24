import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Descuento } from "../../descuento/entities/descuento.entity";
import { Notificacion } from "../../notificacion/entities/notificacion.entity";
import { Resena } from "../../resena/entities/resena.entity";
import { Reserva } from "../../reserva/entities/reserva.entity";

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

  @Column({ name: "Fecha_Nacimiento", type: "date" })
  fechaNacimiento: Date;

  @Column("varchar", { name: "Numero_telefono", length: 15 })
  numeroTelefono: string;

  @Column("varchar", { name: "Correo", length: 100 })
  correo: string;

  @Column("varchar", { name: "Contraseña", length: 255, select: false })
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

  @OneToMany(() => Resena, (resena) => resena.idUsuario2)
  resenas: Resena[];

  @OneToMany(() => Reserva, (reserva) => reserva.idUsuario2)
  reservas: Reserva[];
}
