import { Module } from '@nestjs/common';
import { ExperienciaService } from './experiencia.service';
import { ExperienciaController } from './experiencia.controller';

@Module({
  controllers: [ExperienciaController],
  providers: [ExperienciaService],
})
export class ExperienciaModule {}
