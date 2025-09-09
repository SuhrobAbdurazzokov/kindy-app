import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EducatorService } from './educator.service';
import { CreateEducatorDto } from './dto/create-educator.dto';
import { UpdateEducatorDto } from './dto/update-educator.dto';

@Controller('educator')
export class EducatorController {
  constructor(private readonly educatorService: EducatorService) {}

  @Post()
  create(@Body() createEducatorDto: CreateEducatorDto) {
    return this.educatorService.create(createEducatorDto);
  }

  @Get()
  findAll() {
    return this.educatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educatorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEducatorDto: UpdateEducatorDto) {
    return this.educatorService.update(+id, updateEducatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educatorService.remove(+id);
  }
}
