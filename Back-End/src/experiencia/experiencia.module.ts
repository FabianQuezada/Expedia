import { Module } from '@nestjs/common';
import { ExperienciaService } from './experiencia.service';
import { ExperienciaController } from './experiencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experiencia } from './entities/experiencia.entity';
import { ImagenModule } from 'src/imagen/imagen.module';
import { FechasExperienciaModule } from 'src/fechas-experiencia/fechas-experiencia.module';
import { ResenaModule } from '../resena/resena.module';

@Module({
  imports: [ TypeOrmModule.forFeature([Experiencia]),
  ImagenModule,
  FechasExperienciaModule,ResenaModule
  ],
  controllers: [ExperienciaController],
  providers: [ExperienciaService],
  exports: [TypeOrmModule, ExperienciaService],
})
export class ExperienciaModule {}
