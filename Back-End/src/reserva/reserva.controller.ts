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
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { Rol } from '../common/enums/rol.enum';

interface RequestWithUser extends Request {
  usuario: {
    correo: string;
    rol: string;
    id: number;
  };
}
@ApiBearerAuth()
@ApiTags('Reserva')
@Auth(Rol.USUARIO)
@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}
  @ApiBearerAuth()
  @Auth(Rol.USUARIO)
  @Post()
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservaService.create(createReservaDto);
  }

  @ApiBearerAuth()
  @Auth(Rol.USUARIO)
  @Get('mis-reservas')
  getMisReservas(@Req() req: RequestWithUser) {
    const idUsuario = req.usuario.id;
    return this.reservaService.obtenerReservasPorUsuario(idUsuario);
  }

  @ApiBearerAuth()
  @Auth(Rol.USUARIO)
  @Get()
  findAll() {
    return this.reservaService.findAll();
  }

  @ApiBearerAuth()
  @Auth(Rol.USUARIO)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reservaService.findOne(id);
  }
  @ApiBearerAuth()
  @Auth(Rol.USUARIO)
  @Patch(':idReserva/:idUsuario')
  update(
    @Param('idReserva') idReserva: number,
    @Param('idUsuario') idUsuario: number,
    @Body() updateReservaDto: UpdateReservaDto,
  ) {
    return this.reservaService.update(idReserva, idUsuario, updateReservaDto);
  }

  @ApiBearerAuth()
  @Auth(Rol.ADMIN)
  @Delete(':idReserva/:idUsuario')
  remove(
    @Param('idReserva') idReserva: number,
    @Param('idUsuario') idUsuario: number,
  ) {
    return this.reservaService.remove(idReserva, idUsuario);
  }

}
