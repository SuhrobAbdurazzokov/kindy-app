import { Injectable } from '@nestjs/common';
import { CreateKindergartenDto } from './dto/create-kindergarten.dto';
import { UpdateKindergartenDto } from './dto/update-kindergarten.dto';

@Injectable()
export class KindergartenService {
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
