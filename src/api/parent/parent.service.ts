import { Injectable } from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Parent } from 'src/core/entity/parent.entity';
import type { ParentRepository } from 'src/core/repository/parent.entity';

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(Parent) private readonly parentRepo: ParentRepository,
  ) {}
  create(createParentDto: CreateParentDto) {
    return 'This action adds a new parent';
  }

  findAll() {
    return `This action returns all parent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parent`;
  }

  update(id: number, updateParentDto: UpdateParentDto) {
    return `This action updates a #${id} parent`;
  }

  remove(id: number) {
    return `This action removes a #${id} parent`;
  }
}
