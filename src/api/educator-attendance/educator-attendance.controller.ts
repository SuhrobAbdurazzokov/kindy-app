import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EducatorAttendanceService } from './educator-attendance.service';
import { CreateEducatorAttendanceDto } from './dto/create-educator-attendance.dto';
import { UpdateEducatorAttendanceDto } from './dto/update-educator-attendance.dto';

@Controller('educator-attendance')
export class EducatorAttendanceController {
  constructor(private readonly educatorAttendanceService: EducatorAttendanceService) {}

  @Post()
  create(@Body() createEducatorAttendanceDto: CreateEducatorAttendanceDto) {
    return this.educatorAttendanceService.create(createEducatorAttendanceDto);
  }

  @Get()
  findAll() {
    return this.educatorAttendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educatorAttendanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEducatorAttendanceDto: UpdateEducatorAttendanceDto) {
    return this.educatorAttendanceService.update(+id, updateEducatorAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educatorAttendanceService.remove(+id);
  }
}
