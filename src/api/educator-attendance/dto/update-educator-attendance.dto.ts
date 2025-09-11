import { PartialType } from '@nestjs/mapped-types';
import { CreateEducatorAttendanceDto } from './create-educator-attendance.dto';

export class UpdateEducatorAttendanceDto extends PartialType(
  CreateEducatorAttendanceDto,
) {}
