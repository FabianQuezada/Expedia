import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';

export interface RequestWithUsuario extends Request {
  usuario: {
    id: number;
    correo: string;
    rol: Rol;
  };
}

@ApiBearerAuth()
@ApiTags('Proveedor')
@Controller('proveedor')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @Post()
  create(@Body() createProveedorDto: CreateProveedorDto) {
    return this.proveedorService.create(createProveedorDto);
  }

  @Get()
  findAll() {
    return this.proveedorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proveedorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProveedorDto: UpdateProveedorDto,
  ) {
    return this.proveedorService.update(+id, updateProveedorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proveedorService.remove(+id);
  }
  @Get('profile-proveedor')
  @Auth(Rol.PROVEEDOR)
  getProfileProveedor(@Req() req: RequestWithUsuario) {
    const idProveedor = req.usuario.id;
    return this.proveedorService.findOne(idProveedor);
  }
}
