import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReprogramacionService } from './reprogramacion.service';
import { CreateReprogramacionDto } from './dto/create-reprogramacion.dto';
import { UpdateReprogramacionDto } from './dto/update-reprogramacion.dto';

@Controller('reprogramacion')
export class ReprogramacionController {
  constructor(private readonly reprogramacionService: ReprogramacionService) {}

  @Post()
  create(@Body() createReprogramacionDto: CreateReprogramacionDto) {
    return this.reprogramacionService.create(createReprogramacionDto);
  }

  @Get()
  findAll() {
    return this.reprogramacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reprogramacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReprogramacionDto: UpdateReprogramacionDto) {
    return this.reprogramacionService.update(+id, updateReprogramacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reprogramacionService.remove(+id);
  }
}
