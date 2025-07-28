import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PagoService } from './pago.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { Rol } from '../common/enums/rol.enum';

@ApiBearerAuth()
@ApiTags('Pago')
@Controller('pago')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @ApiBearerAuth()
  @Auth(Rol.USUARIO)
  @Post()
  create(@Body() createPagoDto: CreatePagoDto) {
    return this.pagoService.create(createPagoDto);
  }

  @ApiBearerAuth()
  @Auth(Rol.USUARIO)
  @Get()
  findAll() {
    return this.pagoService.findAll();
  }

  @ApiBearerAuth()
  @Auth(Rol.USUARIO)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pagoService.findOne(id);
  }

  @ApiBearerAuth()
  @Auth(Rol.ADMIN)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePagoDto: UpdatePagoDto) {
    return this.pagoService.update(id, updatePagoDto);
  }
  
  @ApiBearerAuth()
  @Auth(Rol.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.pagoService.remove(id);
  }
}
