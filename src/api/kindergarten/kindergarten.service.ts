import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKindergartenDto } from './dto/create-kindergarten.dto';
import { UpdateKindergartenDto } from './dto/update-kindergarten.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Kindergarten } from 'src/core/entity/kindergarten.entity';
import type { KindergartenRepository } from 'src/core/repository/kindergarten.repository';
import { OwnerService } from '../owner/owner.service';
import { getSuccessRes } from 'src/common/util/response';
import { BaseService } from 'src/infrastructure/base/base.service';

@Injectable()
export class KindergartenService extends BaseService<
  CreateKindergartenDto,
  UpdateKindergartenDto,
  Kindergarten
> {
  constructor(
    @InjectRepository(Kindergarten)
    private readonly kindergartenRepo: KindergartenRepository,
    private readonly ownerService: OwnerService,
  ) {
    super(kindergartenRepo);
  }
  async createKindergarten(createKindergartenDto: CreateKindergartenDto) {
    const { ownerId, licenseNumber, STIR, cardNumber } = createKindergartenDto;

    await this.ownerService.findOneById(ownerId);
    const existsLicenseNumber = await this.kindergartenRepo.findOne({
      where: { licenseNumber },
    });
    if (existsLicenseNumber)
      throw new ConflictException('license number already exists');
    const existsSTIR = await this.kindergartenRepo.findOne({ where: { STIR } });
    if (existsSTIR) throw new ConflictException('STIR number already exists');
    const existsCardNumber = await this.kindergartenRepo.findOne({
      where: { cardNumber },
    });
    if (existsCardNumber)
      throw new ConflictException('card number already exists');

    const kindergarten = this.kindergartenRepo.create(createKindergartenDto);
    await this.kindergartenRepo.save(kindergarten);
    return getSuccessRes(kindergarten);
  }

  async updateKindergarten(
    id: number,
    updateKindergartenDto: UpdateKindergartenDto,
  ) {
    const kindergarten = await this.kindergartenRepo.findOne({ where: { id } });
    if (!kindergarten) throw new NotFoundException('kindergarten not found');

    const { ownerId, licenseNumber, STIR, cardNumber } = updateKindergartenDto;
    if (ownerId) {
      await this.ownerService.findOneById(ownerId);
    }
    if (licenseNumber) {
      const existsLicenseNumber = await this.kindergartenRepo.findOne({
        where: { licenseNumber },
      });
      if (existsLicenseNumber && existsLicenseNumber.id !== id)
        throw new ConflictException('license number already exists');
    }

    if (STIR) {
      const existsSTIR = await this.kindergartenRepo.findOne({
        where: { STIR },
      });
      if (existsSTIR && existsSTIR.id !== id)
        throw new ConflictException('STIR number already exists');
    }
    if (cardNumber) {
      const existsCardNumber = await this.kindergartenRepo.findOne({
        where: { cardNumber },
      });
      if (existsCardNumber && existsCardNumber.id !== id)
        throw new ConflictException('card number already exists');
    }

    await this.kindergartenRepo.update(id, updateKindergartenDto);
    const updatedKindergarten = await this.kindergartenRepo.findOne({
      where: { id },
    });
    return getSuccessRes(updatedKindergarten || {});
  }
}
