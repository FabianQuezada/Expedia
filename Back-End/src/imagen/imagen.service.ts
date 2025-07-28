import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateImagenDto } from './dto/update-imagen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Imagen } from './entities/imagen.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImagenService {
  constructor(
    @InjectRepository(Imagen)
    private readonly imagenRepository: Repository<Imagen>,
  ) {}

  async agregarImagenes(idExperiencia: number, imagenes: { url: string }[]) {
    if (!imagenes?.length) {
      throw new BadRequestException('Debes enviar al menos una imagen');
    }

    const nuevasImagenes = imagenes.map((img) =>
      this.imagenRepository.create({
        url: img.url,
        experiencia: { idExperiencia }, // 
      }),
    );

    await this.imagenRepository.save(nuevasImagenes);
  }
  findAll() {
    return `This action returns all imagen`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imagen`;
  }

  update(id: number, updateImagenDto: UpdateImagenDto) {
    return `This action updates a #${id} imagen`;
  }

  remove(id: number) {
    return `This action removes a #${id} imagen`;
  }
}
