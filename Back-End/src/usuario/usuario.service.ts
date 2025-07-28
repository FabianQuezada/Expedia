import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioRepository.save(createUsuarioDto);
  }

  findOneByEmail(correo: string) {
    return this.usuarioRepository.findOneBy({ correo });
  }

  findByEmailWithPassword(correo: string) {
    return this.usuarioRepository.findOne({
      where: { correo },
      select: ['idUsuario', 'nombre', 'correo', 'contraseña'],
    });
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    console.log()
    const user = await this.usuarioRepository.findOneBy({ idUsuario: id });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ idUsuario: id });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // Actualiza los campos permitidos
    const updated = this.usuarioRepository.merge(usuario, updateUsuarioDto);
    return await this.usuarioRepository.save(updated);
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
  
}
