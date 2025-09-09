import { Injectable } from '@nestjs/common';
import { CreateChildAttendanceDto } from './dto/create-child-attendance.dto';
import { UpdateChildAttendanceDto } from './dto/update-child-attendance.dto';

@Injectable()
export class ChildAttendanceService {
  create(createChildAttendanceDto: CreateChildAttendanceDto) {
    return 'This action adds a new childAttendance';
  }

  findAll() {
    return `This action returns all childAttendance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} childAttendance`;
  }

  update(id: number, updateChildAttendanceDto: UpdateChildAttendanceDto) {
    return `This action updates a #${id} childAttendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} childAttendance`;
  }
}
