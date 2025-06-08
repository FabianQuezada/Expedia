import { IsUrl } from "class-validator";

export class CreateImagenDto {
    @IsUrl()
    url: string;
}
