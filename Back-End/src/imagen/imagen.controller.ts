import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ImagenService } from './imagen.service';
import { CreateImagenDto } from './dto/create-imagen.dto';
import { UpdateImagenDto } from './dto/update-imagen.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Imagen')
@Controller('imagen')
export class ImagenController {
  constructor(private readonly imagenService: ImagenService) {}

  @Post('agregar-imagenes/:idExperiencia')
  @Auth(Rol.PROVEEDOR)
  async agregarImagenes(
    @Param('idExperiencia', ParseIntPipe) idExperiencia: number,
    @Body() createImagenDto: CreateImagenDto[],
  ) {
    return this.imagenService.agregarImagenes(idExperiencia, createImagenDto);
  }

  @Get()
  findAll() {
    return this.imagenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagenService.findOne(+id);
  }

  @ApiBearerAuth()
  @Auth(Rol.PROVEEDOR)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImagenDto: UpdateImagenDto) {
    return this.imagenService.update(+id, updateImagenDto);
  }

  @ApiBearerAuth()
  @Auth(Rol.PROVEEDOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagenService.remove(+id);
  }
}
