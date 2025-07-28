import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Proveedor } from './proveedor.entity';

@Entity('proveedor_update_log')
export class ProveedorUpdateLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  campo: string;

  @CreateDateColumn()
  fecha: Date;

  @Column()
  proveedorId: number;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.logs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'proveedorId' })
  proveedor: Proveedor;
}
