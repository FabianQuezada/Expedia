import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';

export interface RequestWithUsuario extends Request {
  usuario: {
    id: number;
    correo: string;
    rol: Rol;
  };
}

@ApiBearerAuth()
@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @Auth(Rol.ADMIN)
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @Auth(Rol.ADMIN)
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  @Auth(Rol.ADMIN)
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch('mi-perfil')
  @Auth(Rol.USUARIO)
  updatePerfil(
    @Req() req: RequestWithUsuario,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    console.log('🛠️ PATCH req.usuario:', req.usuario); // <- Ya no usas req.user
    return this.usuarioService.update(req.usuario.id, updateUsuarioDto);
  }

  @Delete(':id')
  @Auth(Rol.ADMIN)
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
