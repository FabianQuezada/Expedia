import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { ExperienciaService } from './experiencia.service';
import { CreateExperienciaDto } from './dto/create-experiencia.dto';
import { UpdateExperienciaDto } from './dto/update-experiencia.dto';
import { Request } from 'express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';

interface RequestWithUser extends Request {
  usuario: {
    correo: string;
    rol: string;
    id: number;
  };
}

@Controller('experiencia')
export class ExperienciaController {
  constructor(private readonly experienciaService: ExperienciaService) {}

  @Post('crear-experiencia')
  @Auth(Rol.PROVEEDOR)
  create(
    @Body() createExperienciaDto: CreateExperienciaDto,
    @Req() req: RequestWithUser,
  ) {
    const idProveedor = req.usuario.id;

    return this.experienciaService.create({
      ...createExperienciaDto,
      idProveedor,
    });
  }

  @Get('mis-experiencias')
  @Auth(Rol.PROVEEDOR)
  findByProveedor(@Req() req: RequestWithUser) {
    const idProveedor = req.usuario.id;
    return this.experienciaService.findByProveedor(idProveedor);
  }

  @Get()
  findAll() {
    return this.experienciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experienciaService.findOne(+id);
  }

  @Patch(':id')
  @Auth(Rol.PROVEEDOR)
  update(
    @Param('id') id: string,
    @Body() updateExperienciaDto: UpdateExperienciaDto,
  ) {
    return this.experienciaService.update(+id, updateExperienciaDto);
  }

  @Delete(':id')
  @Auth(Rol.PROVEEDOR)
  remove(@Param('id') id: string) {
    return this.experienciaService.remove(+id);
  }
  @Get(':id/caracteristicas')
  getCaracteristicas(@Param('id') id: string) {
    return this.experienciaService.getCaracteristicasPorExperiencia(+id);
  }
}
