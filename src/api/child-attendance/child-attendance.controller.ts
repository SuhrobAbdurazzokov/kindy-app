import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChildAttendanceService } from './child-attendance.service';
import { CreateChildAttendanceDto } from './dto/create-child-attendance.dto';
import { UpdateChildAttendanceDto } from './dto/update-child-attendance.dto';

@Controller('child-attendance')
export class ChildAttendanceController {
  constructor(
    private readonly childAttendanceService: ChildAttendanceService,
  ) {}

  @Post()
  create(@Body() createChildAttendanceDto: CreateChildAttendanceDto) {
    return this.childAttendanceService.create(createChildAttendanceDto);
  }

  @Get()
  findAll() {
    return this.childAttendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.childAttendanceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChildAttendanceDto: UpdateChildAttendanceDto,
  ) {
    return this.childAttendanceService.update(+id, updateChildAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.childAttendanceService.remove(+id);
  }
}
