import { Injectable } from '@nestjs/common';
import { CreateCancelacionDto } from './dto/create-cancelacion.dto';
import { UpdateCancelacionDto } from './dto/update-cancelacion.dto';

@Injectable()
export class CancelacionService {
  create(createCancelacionDto: CreateCancelacionDto) {
    return 'This action adds a new cancelacion';
  }

  findAll() {
    return `This action returns all cancelacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cancelacion`;
  }

  update(id: number, updateCancelacionDto: UpdateCancelacionDto) {
    return `This action updates a #${id} cancelacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} cancelacion`;
  }
}
