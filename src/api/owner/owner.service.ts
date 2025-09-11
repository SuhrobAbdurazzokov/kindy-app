import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/core/entity/owner.entity';
import type { OwnerRepository } from 'src/core/repository/owner.repository';
import { BaseService } from 'src/infrastructure/base/base.service';
import { CryptoService } from 'src/common/crypt/Crypto';
import { getSuccessRes } from 'src/common/util/response';
import { TokenService } from 'src/common/token/token';
import { SignInDto } from 'src/common/dto/signIn.dto';
import { IToken } from 'src/infrastructure/interface/token.interface';
import { Roles } from 'src/common/enum/roles.enum';
import { Response } from 'express';

@Injectable()
export class OwnerService extends BaseService<
  CreateOwnerDto,
  UpdateOwnerDto,
  Owner
> {
  constructor(
    @InjectRepository(Owner) private readonly ownerRepo: OwnerRepository,
    private readonly crypto: CryptoService,
    private readonly token: TokenService,
  ) {
    super(ownerRepo);
  }
  async createOwner(createOwnerDto: CreateOwnerDto) {
    const { login, passportId, phoneNumber, password } = createOwnerDto;
    const existsLogin = await this.ownerRepo.findOne({ where: { login } });
    if (existsLogin) throw new ConflictException('Login already exists');
    const existsPassportId = await this.ownerRepo.findOne({
      where: { passportId },
    });
    if (existsPassportId)
      throw new ConflictException('Passport id already exists');
    const existsPhoneNumber = await this.ownerRepo.findOne({
      where: {
        phoneNumber,
      },
    });
    if (existsPhoneNumber)
      throw new ConflictException('phone number already exists');

    const hashedPassword = await this.crypto.encrypt(password);
    const owner = this.ownerRepo.create({
      ...createOwnerDto,
      password: hashedPassword,
    });

    await this.ownerRepo.save(owner);
    return getSuccessRes(owner, 201);
  }

  async updateOwner(id: number, updateOwnerDto: UpdateOwnerDto) {
    const owner = await this.ownerRepo.findOne({
      where: { id },
    });
    if (!owner) throw new NotFoundException('owner not found');

    const { login, passportId, password, phoneNumber } = updateOwnerDto;
    if (login) {
      const existsLogin = await this.ownerRepo.findOne({ where: { login } });
      if (existsLogin && existsLogin?.id !== id)
        throw new ConflictException('login already exists');
    }

    if (passportId) {
      const existsPassportId = await this.ownerRepo.findOne({
        where: {
          passportId,
        },
      });
      if (existsPassportId && existsPassportId.id !== id)
        throw new ConflictException('passport id alreay exists');
    }

    if (phoneNumber) {
      const existsPhoneNumber = await this.ownerRepo.findOne({
        where: { phoneNumber },
      });
      if (existsPhoneNumber && existsPhoneNumber.id !== id)
        throw new ConflictException('phone number already exists');
    }

    await this.ownerRepo.update(id, updateOwnerDto);

    const updateOwner = await this.ownerRepo.findOne({ where: { id } });

    return getSuccessRes(updateOwner || {});
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const { login, password } = signInDto;

    const owner = await this.ownerRepo.findOne({ where: { login } });
    const isMatchedPassword = await this.crypto.decrypt(
      password,
      owner?.password || '',
    );
    if (!owner || !isMatchedPassword)
      throw new BadRequestException('login or password incorrect');

    const paylod: IToken = {
      id: owner.id,
      isActive: owner.isActive,
      role: Roles.OWNER,
    };
    const accessToken = await this.token.accessToken(paylod);
    const refreshToken = await this.token.refreshToken(paylod);
    await this.token.writeCookie(res, 'ownerToken', refreshToken, 15);
    return getSuccessRes({ token: accessToken });
  }
}
