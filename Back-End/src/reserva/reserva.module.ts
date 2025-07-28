import { forwardRef, Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { FechasExperienciaModule } from 'src/fechas-experiencia/fechas-experiencia.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ExperienciaModule } from 'src/experiencia/experiencia.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserva]),
    UsuarioModule,
    FechasExperienciaModule,
    forwardRef(() => ExperienciaModule), // 👈 aquí el cambio clave
  ],
  controllers: [ReservaController],
  providers: [ReservaService],
  exports: [TypeOrmModule, ReservaService], // opcional si lo usás en otros módulos
})
export class ReservaModule {}