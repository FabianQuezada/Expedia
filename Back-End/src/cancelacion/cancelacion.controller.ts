import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CancelacionService } from './cancelacion.service';
import { CreateCancelacionDto } from './dto/create-cancelacion.dto';
import { UpdateCancelacionDto } from './dto/update-cancelacion.dto';

@Controller('cancelacion')
export class CancelacionController {
  constructor(private readonly cancelacionService: CancelacionService) {}

  @Post()
  create(@Body() createCancelacionDto: CreateCancelacionDto) {
    return this.cancelacionService.create(createCancelacionDto);
  }

  @Get()
  findAll() {
    return this.cancelacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cancelacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCancelacionDto: UpdateCancelacionDto) {
    return this.cancelacionService.update(+id, updateCancelacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cancelacionService.remove(+id);
  }
}
