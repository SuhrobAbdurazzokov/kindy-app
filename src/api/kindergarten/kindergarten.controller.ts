import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KindergartenService } from './kindergarten.service';
import { CreateKindergartenDto } from './dto/create-kindergarten.dto';
import { UpdateKindergartenDto } from './dto/update-kindergarten.dto';

@Controller('kindergarten')
export class KindergartenController {
  constructor(private readonly kindergartenService: KindergartenService) {}

  @Post()
  create(@Body() createKindergartenDto: CreateKindergartenDto) {
    return this.kindergartenService.create(createKindergartenDto);
  }

  @Get()
  findAll() {
    return this.kindergartenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kindergartenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKindergartenDto: UpdateKindergartenDto) {
    return this.kindergartenService.update(+id, updateKindergartenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kindergartenService.remove(+id);
  }
}
