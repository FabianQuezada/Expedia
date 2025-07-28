import { Module } from '@nestjs/common';
import { ExperienciaService } from './experiencia.service';
import { ExperienciaController } from './experiencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experiencia } from './entities/experiencia.entity';
import { ImagenModule } from 'src/imagen/imagen.module';
import { FechasExperienciaModule } from 'src/fechas-experiencia/fechas-experiencia.module';
import { ResenaModule } from '../resena/resena.module';
import { Imagen } from '../imagen/entities/imagen.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Experiencia]),
  ImagenModule,
  FechasExperienciaModule,ResenaModule,Imagen,
  ],
  controllers: [ExperienciaController],
  providers: [ExperienciaService],
  exports: [TypeOrmModule, ExperienciaService],
})
export class ExperienciaModule {}
