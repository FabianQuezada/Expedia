import { Injectable } from '@nestjs/common';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { Proveedor } from './entities/proveedor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { NotFoundException } from '@nestjs/common';
import { validarPoliticaCampo } from './utils/proveedorUpdate.service';
import { ProveedorUpdateLog } from './entities/proveedorUpdateLog.entity';
@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
    @InjectRepository(ProveedorUpdateLog) //
    private readonly logRepository: Repository<ProveedorUpdateLog>,
  ) {}

  create(createProveedorDto: CreateProveedorDto) {
    return this.proveedorRepository.save(createProveedorDto);
  }

  findOneByEmail(correo: string) {
    return this.proveedorRepository.findOneBy({ correo });
  }

  findByEmailWithPassword(correo: string) {
    return this.proveedorRepository.findOne({
      where: { correo },
      select: ['idProveedor', 'nombreEmpresa', 'correo', 'contraseña'],
    });
  }

  findAll() {
    return this.proveedorRepository.find();
  }

  async findOne(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedorRepository.findOneBy({
      idProveedor: id,
    });

    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }

    return proveedor;
  }

  async update(id: number, updateDto: UpdateProveedorDto) {
    console.log('✅ ID que llega:', id);
    const proveedor = await this.proveedorRepository.findOne({
      where: { idProveedor: id },
      relations: ['logs'],
    });
    console.log('✅ ID que llega:', proveedor);

    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }

    const campos = ['nombreEmpresa', 'descripcion', 'telefono'];
    const logs = proveedor.logs || [];

    // 🔐 Verifica que el ID sea válido
    if (!id || isNaN(id)) {
      throw new Error('ID inválido (NaN) recibido en update()');
    }

    // Validación antes de modificar
    for (const campo of campos) {
      if (campo in updateDto && updateDto[campo] !== proveedor[campo]) {
        validarPoliticaCampo(campo, logs);
      }
    }

    // Guardar copia de los valores previos
    const proveedorAntes = { ...proveedor };

    // Modificar proveedor
    Object.assign(proveedor, updateDto);
    await this.proveedorRepository.save(proveedor);

    // Registrar logs por campos realmente cambiados
    const nuevosLogs = campos
      .filter(
        (campo) =>
          campo in updateDto && updateDto[campo] !== proveedorAntes[campo],
      )
      .map((campo) =>
        this.logRepository.create({
          campo,
          proveedorId: proveedor.idProveedor, // ✅ más seguro
        }),
      );

    if (nuevosLogs.length > 0) {
      console.log('🧪 Logs a guardar:', nuevosLogs);
      console.log('🧪 proveedor.idProveedor:', proveedor.idProveedor);
      await this.logRepository.save(nuevosLogs);
    }

    return proveedor;
  }

  remove(id: number) {
    return `This action removes a #${id} proveedor`;
  }
}
