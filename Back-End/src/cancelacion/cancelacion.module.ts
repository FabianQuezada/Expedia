import { Module } from '@nestjs/common';
import { CancelacionService } from './cancelacion.service';
import { CancelacionController } from './cancelacion.controller';

@Module({
  controllers: [CancelacionController],
  providers: [CancelacionService],
})
export class CancelacionModule {}
