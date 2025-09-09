import { Injectable } from '@nestjs/common';
import { CreateEducatorAttendanceDto } from './dto/create-educator-attendance.dto';
import { UpdateEducatorAttendanceDto } from './dto/update-educator-attendance.dto';

@Injectable()
export class EducatorAttendanceService {
  create(createEducatorAttendanceDto: CreateEducatorAttendanceDto) {
    return 'This action adds a new educatorAttendance';
  }

  findAll() {
    return `This action returns all educatorAttendance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} educatorAttendance`;
  }

  update(id: number, updateEducatorAttendanceDto: UpdateEducatorAttendanceDto) {
    return `This action updates a #${id} educatorAttendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} educatorAttendance`;
  }
}
