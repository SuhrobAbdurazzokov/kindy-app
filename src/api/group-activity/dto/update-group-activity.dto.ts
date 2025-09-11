import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupActivityDto } from './create-group-activity.dto';

export class UpdateGroupActivityDto extends PartialType(
  CreateGroupActivityDto,
) {}
