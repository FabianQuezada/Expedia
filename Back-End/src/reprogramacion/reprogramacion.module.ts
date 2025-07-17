import { Module } from '@nestjs/common';
import { ReprogramacionService } from './reprogramacion.service';
import { ReprogramacionController } from './reprogramacion.controller';

@Module({
  controllers: [ReprogramacionController],
  providers: [ReprogramacionService],
})
export class ReprogramacionModule {}
