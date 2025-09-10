import { Injectable } from '@nestjs/common';
import { CreateEducatorDto } from './dto/create-educator.dto';
import { UpdateEducatorDto } from './dto/update-educator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Educator } from 'src/core/entity/educator.entity';
import type { EducatorRepository } from 'src/core/repository/educator.repository';

@Injectable()
export class EducatorService {
  constructor(
    @InjectRepository(Educator)
    private readonly educatorRepo: EducatorRepository,
  ) {}
  create(createEducatorDto: CreateEducatorDto) {
    return 'This action adds a new educator';
  }

  findAll() {
    return `This action returns all educator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} educator`;
  }

  update(id: number, updateEducatorDto: UpdateEducatorDto) {
    return `This action updates a #${id} educator`;
  }

  remove(id: number) {
    return `This action removes a #${id} educator`;
  }
}
