import { Injectable } from '@nestjs/common';
import { CreateKindergartenDto } from './dto/create-kindergarten.dto';
import { UpdateKindergartenDto } from './dto/update-kindergarten.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Kindergarten } from 'src/core/entity/kindergarten.repository';
import type { KindergartenRepository } from 'src/core/repository/kindergarten.repository';

@Injectable()
export class KindergartenService {
  constructor(
    @InjectRepository(Kindergarten)
    private readonly kindergartenRepo: KindergartenRepository,
  ) {}
  create(createKindergartenDto: CreateKindergartenDto) {
    return 'This action adds a new kindergarten';
  }

  findAll() {
    return `This action returns all kindergarten`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kindergarten`;
  }

  update(id: number, updateKindergartenDto: UpdateKindergartenDto) {
    return `This action updates a #${id} kindergarten`;
  }

  remove(id: number) {
    return `This action removes a #${id} kindergarten`;
  }
}
