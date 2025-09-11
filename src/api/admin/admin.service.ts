import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/core/entity/admin.entity';
import type { AdminRepositoy } from 'src/core/repository/admin.repository';
import { BaseService } from 'src/infrastructure/base/base.service';
import { TokenService } from 'src/common/token/token';
import { CryptoService } from 'src/common/crypt/Crypto';
import { SignInDto } from 'src/common/dto/signIn.dto';
import { IToken } from 'src/infrastructure/interface/token.interface';
import { getSuccessRes } from 'src/common/util/response';
import { Response } from 'express';
import { Roles } from 'src/common/enum/roles.enum';
import { config } from 'src/config';

@Injectable()
export class AdminService
  extends BaseService<CreateAdminDto, UpdateAdminDto, Admin>
  implements OnModuleInit
{
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: AdminRepositoy,
    private readonly token: TokenService,
    private readonly crypto: CryptoService,
  ) {
    super(adminRepo);
  }

  async onModuleInit(): Promise<void> {
    try {
      const existsSuperadmin = await this.adminRepo.findOne({
        where: { role: Roles.SUPER_ADMIN },
      });

      const password = config.SUPER_ADMIN_PASSWORD;

      if (!existsSuperadmin) {
        const hashedPassword = await this.crypto.encrypt(password || '');
        const superadmin = this.adminRepo.create({
          login: config.SUPER_ADMIN_LOGIN,
          password: hashedPassword,
          role: Roles.SUPER_ADMIN,
          isActive: true,
        });
        await this.adminRepo.save(superadmin);
        console.log('Super admin created successfully');
      }
    } catch (error) {
      throw new InternalServerErrorException('Error on creating super admin');
    }
  }
  async createAdmin(createAdminDto: CreateAdminDto) {
    const { login, phoneNumber } = createAdminDto;

    const existsLogin = await this.adminRepo.findOne({ where: { login } });
    if (existsLogin) throw new ConflictException('Login already exists');

    const existsPhoneNumber = await this.adminRepo.findOne({
      where: { phoneNumber },
    });
    if (existsPhoneNumber)
      throw new ConflictException('phone number already exists');

    const admin = this.adminRepo.create(createAdminDto);
    await this.adminRepo.save(admin);
    return getSuccessRes(admin, 201);
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const { login, password } = signInDto;

    const admin = await this.adminRepo.findOne({ where: { login } });
    const isMatchedPassword = await this.crypto.decrypt(
      password,
      admin?.password || '',
    );
    if (!admin || !isMatchedPassword)
      throw new BadRequestException('login or password incorrect');

    const paylod: IToken = {
      id: admin.id,
      isActive: admin.isActive,
      role: admin.role,
    };
    const accessToken = await this.token.accessToken(paylod);
    const refreshToken = await this.token.refreshToken(paylod);
    await this.token.writeCookie(res, 'adminToken', refreshToken, 15);
    return getSuccessRes({ token: accessToken });
  }

  async updateAdmin(id: number, updateAdminDto: UpdateAdminDto, user: IToken) {
    const { login, password, isActive } = updateAdminDto;

    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    if (login) {
      const existslogin = await this.adminRepo.findOne({
        where: { login },
      });
      if (existslogin && existslogin.id !== id) {
        throw new ConflictException('login already exists');
      }
    }

    let hashedPassword = admin.password;
    let is_active = admin.isActive;

    if (user.role === Roles.SUPER_ADMIN) {
      if (password) {
        hashedPassword = await this.crypto.encrypt(password);
      }
      if (typeof isActive === 'boolean') {
        is_active = isActive;
      }
    }

    const updateData: any = {};
    if (login) updateData.login = login;
    updateData.password = hashedPassword;
    updateData.isActive = is_active;

    await this.adminRepo.update(id, updateData);
    return this.findOneById(id);
  }
}
