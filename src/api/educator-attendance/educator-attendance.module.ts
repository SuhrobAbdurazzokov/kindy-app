import { Module } from '@nestjs/common';
import { EducatorAttendanceService } from './educator-attendance.service';
import { EducatorAttendanceController } from './educator-attendance.controller';
import { EducatorAttendace } from 'src/core/entity/educatorAttendance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EducatorAttendace])],
  controllers: [EducatorAttendanceController],
  providers: [EducatorAttendanceService],
})
export class EducatorAttendanceModule {}
