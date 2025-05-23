import { Module } from '@nestjs/common';
import { CaracteristicaService } from './caracteristica.service';
import { CaracteristicaController } from './caracteristica.controller';

@Module({
  controllers: [CaracteristicaController],
  providers: [CaracteristicaService],
})
export class CaracteristicaModule {}
