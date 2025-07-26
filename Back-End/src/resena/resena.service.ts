import { Injectable } from '@nestjs/common';
import { CreateResenaDto } from './dto/create-resena.dto';
import { UpdateResenaDto } from './dto/update-resena.dto';

@Injectable()
export class ResenaService {

  create(createResenaDto: CreateResenaDto) {
    return `This action adds a new reseña`;
  }

  findAll() {
    return `This action returns all reseña`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reseña`;
  }

  update(id: number, updateResenaDto: UpdateResenaDto) {
    return `This action updates a #${id} reseña`;
  }

  remove(id: number) {
    return `This action removes a #${id} reseña`;
  }
}
