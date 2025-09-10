import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/core/entity/owner.entity';
import type { OwnerRepository } from 'src/core/repository/owner.repository';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner) private readonly ownerRepo: OwnerRepository,
  ) {}
  create(createOwnerDto: CreateOwnerDto) {
    return 'This action adds a new owner';
  }

  findAll() {
    return `This action returns all owner`;
  }

  findOne(id: number) {
    return `This action returns a #${id} owner`;
  }

  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
