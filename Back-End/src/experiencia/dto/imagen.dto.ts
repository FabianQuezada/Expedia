import { IsString } from 'class-validator';

export class ImagenDto {
    @IsString()
    url: string;
}