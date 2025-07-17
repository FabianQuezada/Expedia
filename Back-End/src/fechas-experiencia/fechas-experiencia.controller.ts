import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FechasExperienciaService } from './fechas-experiencia.service';
import { CreateFechasExperienciaDto } from './dto/create-fechas-experiencia.dto';
import { UpdateFechasExperienciaDto } from './dto/update-fechas-experiencia.dto';

@Controller('fechas-experiencia')
export class FechasExperienciaController {
  constructor(private readonly fechasExperienciaService: FechasExperienciaService) {}

  @Post()
  create(@Body() createFechasExperienciaDto: CreateFechasExperienciaDto) {
    return this.fechasExperienciaService.create(createFechasExperienciaDto);
  }

  @Get()
  findAll() {
    return this.fechasExperienciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fechasExperienciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFechasExperienciaDto: UpdateFechasExperienciaDto) {
    return this.fechasExperienciaService.update(+id, updateFechasExperienciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fechasExperienciaService.remove(+id);
  }
}
