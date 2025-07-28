import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CancelacionService } from './cancelacion.service';
import { CreateCancelacionDto } from './dto/create-cancelacion.dto';
import { UpdateCancelacionDto } from './dto/update-cancelacion.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Cancelación')
@ApiBearerAuth()
@Auth(Rol.USUARIO)
@Controller('cancelacion')
export class CancelacionController {
  constructor(private readonly cancelacionService: CancelacionService) {}

  @Auth(Rol.USUARIO)
  @Post(':idReserva')
  cancelarReserva(@Param('idReserva', ParseIntPipe) idReserva: number,
    @Body() createCancelacionDto: CreateCancelacionDto) {
    return this.cancelacionService.cancelarReserva(idReserva, createCancelacionDto);
  }

  @Get()
  @Auth(Rol.ADMIN)
  findAll() {
    return this.cancelacionService.findAll();
  }

  @Auth(Rol.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cancelacionService.findOne(+id);
  }

  @Auth(Rol.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCancelacionDto: UpdateCancelacionDto) {
    return this.cancelacionService.update(+id, updateCancelacionDto);
  }

  @Auth(Rol.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cancelacionService.remove(+id);
  }
  
}
