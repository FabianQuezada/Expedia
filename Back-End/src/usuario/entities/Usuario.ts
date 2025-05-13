import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Descuento } from "../../descuento/entities/Descuento";
import { Proveedor } from "../../proveedor/entities/Proveedor";
import { Notificacion } from "../../notificacion/entities/Notificacion";
import { Reseña } from "../../reseña/entities/Reseña";
import { Reserva } from "../../reserva/entities/Reserva";

@Entity("usuario", { schema: "nest_bd" })
export class Usuario {
  @Column("int", { primary: true, name: "ID_Usuario" })
  idUsuario: number;

  @Column("varchar", { name: "Nombre", length: 100 })
  nombre: string;

  @Column("varchar", { name: "Genero", length: 10 })
  genero: string;

  @Column("date", { name: "Fecha_Nacimiento" })
  fechaNacimiento: string;

  @Column("varchar", { name: "Numero_telefono", length: 15 })
  numeroTelefono: string;

  @Column("varchar", { name: "Correo", length: 100 })
  correo: string;

  @Column("varchar", { name: "Contreseña", length: 255 })
  contreseña: string;

  @Column("varchar", { name: "Tipo_Usuario", length: 20 })
  tipoUsuario: string;

  @Column("date", { name: "Fecha_Registro" })
  fechaRegistro: string;

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

  @OneToMany(() => Proveedor, (proveedor) => proveedor.idUsuario2)
  proveedors: Proveedor[];

  @ManyToMany(() => Notificacion, (notificacion) => notificacion.usuarios)
  notificacions: Notificacion[];

  @OneToMany(() => Reseña, (reseña) => reseña.idUsuario2)
  reseñas: Reseña[];

  @OneToMany(() => Reserva, (reserva) => reserva.idUsuario2)
  reservas: Reserva[];
}
