import { Injectable } from '@nestjs/common';
import { CreateGroupActivityDto } from './dto/create-group-activity.dto';
import { UpdateGroupActivityDto } from './dto/update-group-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupActivity } from 'src/core/entity/groupActivitiy.entity';
import type { GroupActivityRepository } from 'src/core/repository/groupActivity.repository';

@Injectable()
export class GroupActivityService {
  constructor(
    @InjectRepository(GroupActivity)
    private readonly groupActivityRepo: GroupActivityRepository,
  ) {}
  create(createGroupActivityDto: CreateGroupActivityDto) {
    return 'This action adds a new groupActivity';
  }

  findAll() {
    return `This action returns all groupActivity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupActivity`;
  }

  update(id: number, updateGroupActivityDto: UpdateGroupActivityDto) {
    return `This action updates a #${id} groupActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupActivity`;
  }
}
