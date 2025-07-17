import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExperienciaService } from './experiencia.service';
import { CreateExperienciaDto } from './dto/create-experiencia.dto';
import { UpdateExperienciaDto } from './dto/update-experiencia.dto';

@Controller('experiencia')
export class ExperienciaController {
  constructor(private readonly experienciaService: ExperienciaService) {}

  @Post()
  create(@Body() createExperienciaDto: CreateExperienciaDto) {
    return this.experienciaService.create(createExperienciaDto);
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
  update(@Param('id') id: string, @Body() updateExperienciaDto: UpdateExperienciaDto) {
    return this.experienciaService.update(+id, updateExperienciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experienciaService.remove(+id);
  }
}
