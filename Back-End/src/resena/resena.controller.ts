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
import { ResenaService } from './resena.service';
import { CreateResenaDto } from './dto/create-resena.dto';
import { UpdateResenaDto } from './dto/update-resena.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
interface RequestWithUser extends Request {
  usuario: {
    correo: string;
    rol: string;
    id: number;
  };
}
@ApiBearerAuth()
@ApiTags('Reseña')
@Controller('resena')
export class ResenaController {
  constructor(private readonly resenaService: ResenaService) {}

  @Post(':idReserva')
  @Auth(Rol.USUARIO)
  create(
    @Param('idReserva', ParseIntPipe) idReserva: number,
    @Body() createResenaDto: CreateResenaDto,
    @Req() req: RequestWithUser,
  ) {
    const idUsuario = req.usuario.id;
    return this.resenaService.create(idReserva, createResenaDto, idUsuario);
  }

  @Get()
  findAll() {
    return this.resenaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resenaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResenaDto: UpdateResenaDto) {
    return this.resenaService.update(+id, updateResenaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resenaService.remove(+id);
  }

  @Get('experiencia/:idExperiencia')
  findByExperiencia(
    @Param('idExperiencia', ParseIntPipe) idExperiencia: number,
  ) {
    return this.resenaService.findByExperiencia(idExperiencia);
  }
}
