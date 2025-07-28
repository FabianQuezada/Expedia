import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaracteristicaService } from './caracteristica.service';
import { CreateCaracteristicaDto } from './dto/create-caracteristica.dto';
import { UpdateCaracteristicaDto } from './dto/update-caracteristica.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Característica')
@Controller('caracteristica')
export class CaracteristicaController {
  constructor(private readonly caracteristicaService: CaracteristicaService) {}

  @ApiBearerAuth()
  @Auth(Rol.PROVEEDOR)
  @Post()
  create(@Body() createCaracteristicaDto: CreateCaracteristicaDto) {
    return this.caracteristicaService.create(createCaracteristicaDto);
  }

  @Get()
  findAll() {
    return this.caracteristicaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caracteristicaService.findOne(+id);
  }

  @ApiBearerAuth()
  @Auth(Rol.PROVEEDOR)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaracteristicaDto: UpdateCaracteristicaDto) {
    return this.caracteristicaService.update(+id, updateCaracteristicaDto);
  }

  @ApiBearerAuth()
  @Auth(Rol.PROVEEDOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caracteristicaService.remove(+id);
  }
}
