import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupActivityService } from './group-activity.service';
import { CreateGroupActivityDto } from './dto/create-group-activity.dto';
import { UpdateGroupActivityDto } from './dto/update-group-activity.dto';

@Controller('group-activity')
export class GroupActivityController {
  constructor(private readonly groupActivityService: GroupActivityService) {}

  @Post()
  create(@Body() createGroupActivityDto: CreateGroupActivityDto) {
    return this.groupActivityService.create(createGroupActivityDto);
  }

  @Get()
  findAll() {
    return this.groupActivityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupActivityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGroupActivityDto: UpdateGroupActivityDto,
  ) {
    return this.groupActivityService.update(+id, updateGroupActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupActivityService.remove(+id);
  }
}
