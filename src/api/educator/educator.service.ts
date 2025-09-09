import { Injectable } from '@nestjs/common';
import { CreateEducatorDto } from './dto/create-educator.dto';
import { UpdateEducatorDto } from './dto/update-educator.dto';

@Injectable()
export class EducatorService {
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
