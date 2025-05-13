import { PartialType } from '@nestjs/mapped-types';
import { CreateCancelacionDto } from './create-cancelacion.dto';

export class UpdateCancelacionDto extends PartialType(CreateCancelacionDto) {}
