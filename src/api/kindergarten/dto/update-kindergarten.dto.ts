import { PartialType } from '@nestjs/mapped-types';
import { CreateKindergartenDto } from './create-kindergarten.dto';

export class UpdateKindergartenDto extends PartialType(CreateKindergartenDto) {}
