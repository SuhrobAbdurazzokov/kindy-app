import { Injectable } from '@nestjs/common';
import { CreateEducatorAttendanceDto } from './dto/create-educator-attendance.dto';
import { UpdateEducatorAttendanceDto } from './dto/update-educator-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EducatorAttendace } from 'src/core/entity/educatorAttendance.entity';
import type { EducatorAttendaceRepository } from 'src/core/repository/educatorAttendace.repository';

@Injectable()
export class EducatorAttendanceService {
  constructor(
    @InjectRepository(EducatorAttendace)
    private readonly educatorAttendaceRepo: EducatorAttendaceRepository,
  ) {}
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
