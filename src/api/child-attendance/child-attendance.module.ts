import { Module } from '@nestjs/common';
import { ChildAttendanceService } from './child-attendance.service';
import { ChildAttendanceController } from './child-attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildAttendance } from 'src/core/entity/chiildAttendance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChildAttendance])],
  controllers: [ChildAttendanceController],
  providers: [ChildAttendanceService],
})
export class ChildAttendanceModule {}
