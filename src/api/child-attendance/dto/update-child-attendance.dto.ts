import { PartialType } from '@nestjs/mapped-types';
import { CreateChildAttendanceDto } from './create-child-attendance.dto';

export class UpdateChildAttendanceDto extends PartialType(CreateChildAttendanceDto) {}
