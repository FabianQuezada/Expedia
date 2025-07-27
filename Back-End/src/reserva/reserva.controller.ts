import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Reserva')
@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservaService.create(createReservaDto);
  }

  @Get()
  findAll() {
    return this.reservaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reservaService.findOne(id);
  }

  @Patch(':idReserva/:idUsuario')
  update(
    @Param('idReserva') idReserva: number,
    @Param('idUsuario') idUsuario: number,
    @Body() updateReservaDto: UpdateReservaDto) {
    return this.reservaService.update(idReserva, idUsuario, updateReservaDto);
  }

  @Delete(':idReserva/:idUsuario')
  remove(
    @Param('idReserva') idReserva: number,
    @Param('idUsuario') idUsuario: number) {
    return this.reservaService.remove(idReserva, idUsuario);
  }
}
