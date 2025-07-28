import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FechasExperienciaService } from './fechas-experiencia.service';
import { CreateFechasExperienciaDto } from './dto/create-fechas-experiencia.dto';
import { UpdateFechasExperienciaDto } from './dto/update-fechas-experiencia.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Fechas de experiencia')
@Controller('fechas-experiencia')
export class FechasExperienciaController {
  constructor(
    private readonly fechasExperienciaService: FechasExperienciaService,
  ) {}

  @Post('agregar-fechas/:idExperiencia')
  @Auth(Rol.PROVEEDOR)
  async agregarFechas(
    @Param('idExperiencia', ParseIntPipe) idExperiencia: number,
    @Body() createFechasExperienciaDto: CreateFechasExperienciaDto[],
  ) {
    return this.fechasExperienciaService.agregarFechas(
      idExperiencia,
      createFechasExperienciaDto,
    );
  }

  @Get('descuentos')
  async getFechasConDescuento() {
    return this.fechasExperienciaService.findAllConDescuento();
  }

  @Get('descuento-prueba')
  async prueba() {
    return this.fechasExperienciaService.aplicarDescuentoMensual();
  }

  @Get('all')
  findAll() {
    return this.fechasExperienciaService.findAll();
  }

  @Get(':fecha/:idExperiencia')
  findOne(
    @Param('fecha') fecha: Date,
    @Param('idExperiencia', ParseIntPipe) idExperiencia: number
  ) {
    return this.fechasExperienciaService.findOne(new Date(fecha), +idExperiencia);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFechasExperienciaDto: UpdateFechasExperienciaDto,
  ) {
    return this.fechasExperienciaService.update(
      +id,
      updateFechasExperienciaDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fechasExperienciaService.remove(+id);
  }
}
