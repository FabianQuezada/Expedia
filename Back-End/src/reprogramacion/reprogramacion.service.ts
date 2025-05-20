import { Injectable } from '@nestjs/common';
import { CreateReprogramacionDto } from './dto/create-reprogramacion.dto';
import { UpdateReprogramacionDto } from './dto/update-reprogramacion.dto';

@Injectable()
export class ReprogramacionService {
  create(createReprogramacionDto: CreateReprogramacionDto) {
    return 'This action adds a new reprogramacion';
  }

  findAll() {
    return `This action returns all reprogramacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reprogramacion`;
  }

  update(id: number, updateReprogramacionDto: UpdateReprogramacionDto) {
    return `This action updates a #${id} reprogramacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} reprogramacion`;
  }
}
