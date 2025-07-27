import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { registerDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ProveedorService } from 'src/proveedor/proveedor.service';
import { registerPDto } from './dto/registerP.dto';
import { Rol } from '../common/enums/rol.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly proveedorService: ProveedorService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ nombre, apellido, correo, contraseña }: registerDto) {
    const usuario = await this.usuarioService.findOneByEmail(correo);

    if (usuario) {
      throw new BadRequestException('El correo ya está registrado');
    }

    await this.usuarioService.create({
      nombre,
      apellido,
      correo,
      contraseña: await bcrypt.hash(contraseña, 10),
    });

    return {
      nombre,
      correo,
    };
  }

  async registerProveedor({ nombreEmpresa, correo, contraseña }: registerPDto) {
    const usuario = await this.proveedorService.findOneByEmail(correo);

    if (usuario) {
      throw new BadRequestException('El correo ya está registrado');
    }

    await this.proveedorService.create({
      nombreEmpresa,
      correo,
      contraseña: await bcrypt.hash(contraseña, 10),
    });

    return {
      nombreEmpresa,
      correo,
    };
  }

  async login({ correo, contraseña }: LoginDto) {
    let usuario: any =
      await this.usuarioService.findByEmailWithPassword(correo);
    let rol = Rol.USUARIO;

    if (!usuario) {
      usuario = await this.proveedorService.findByEmailWithPassword(correo);
      rol = Rol.PROVEEDOR;
    }

    if (!usuario) {
      throw new UnauthorizedException('El correo no está registrado');
    }

    const contraseñaValida = await bcrypt.compare(
      contraseña,
      usuario.contraseña,
    );
    if (!contraseñaValida) {
      throw new UnauthorizedException('La contraseña es incorrecta');
    }

    const payload = {
      sub: rol === Rol.USUARIO ? usuario.idUsuario : usuario.idProveedor,
      correo: usuario.correo,
      rol,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      correo: usuario.correo,
      rol,
      id: payload.sub,
    };
  }

  async profile({ correo, rol }: { correo: string; rol: string }) {
    return await this.usuarioService.findOneByEmail(correo);
  }
}
