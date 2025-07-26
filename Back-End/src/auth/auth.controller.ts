import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { Rol } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { registerPDto } from './dto/registerP.dto';

interface RequestWithUser extends Request {
  usuario: {
    correo: string;
    rol: string;
  };
}
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(
    @Body() registerDto: registerDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('registerProveedor')
  registerProveedor(
    @Body() registerPDto: registerPDto,
  ) {
    return this.authService.registerProveedor(registerPDto);
  }

  @Post('login')
  login(
    @Body() loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @Auth(Rol.USUARIO)
  profile(@Req() req:RequestWithUser) {
    return this.authService.profile(req.usuario);
  }
}
