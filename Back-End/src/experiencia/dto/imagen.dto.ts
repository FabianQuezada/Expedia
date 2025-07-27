import { IsUrl } from 'class-validator';

export class ImagenDto {
    @IsUrl()
    url: string;
}