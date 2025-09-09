import { Module } from '@nestjs/common';
import { ChildAttendanceService } from './child-attendance.service';
import { ChildAttendanceController } from './child-attendance.controller';

@Module({
  controllers: [ChildAttendanceController],
  providers: [ChildAttendanceService],
})
export class ChildAttendanceModule {}
