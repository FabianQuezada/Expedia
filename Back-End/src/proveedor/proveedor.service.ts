import { Injectable } from '@nestjs/common';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { Proveedor } from './entities/proveedor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProveedorDto } from './dto/create-proveedor.dto';

@Injectable()
export class ProveedorService {

  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
  ) {}

  create(createProveedorDto: CreateProveedorDto) {
    return this.proveedorRepository.save(createProveedorDto);
  }

  findOneByEmail(correo: string) {
    return this.proveedorRepository.findOneBy({ correo })
  }

  findByEmailWithPassword(correo: string) {
    return this.proveedorRepository.findOne({
      where: { correo },
      select: ['idProveedor', 'nombreEmpresa', 'correo', 'contraseña']
    })
  }

  findAll() {
    return this.proveedorRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} proveedor`;
  }

  update(id: number, updateProveedorDto: UpdateProveedorDto) {
    return `This action updates a #${id} proveedor`;
  }

  remove(id: number) {
    return `This action removes a #${id} proveedor`;
  }
}
