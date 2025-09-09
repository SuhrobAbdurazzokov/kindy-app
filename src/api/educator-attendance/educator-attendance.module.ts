import { Module } from '@nestjs/common';
import { EducatorAttendanceService } from './educator-attendance.service';
import { EducatorAttendanceController } from './educator-attendance.controller';

@Module({
  controllers: [EducatorAttendanceController],
  providers: [EducatorAttendanceService],
})
export class EducatorAttendanceModule {}
