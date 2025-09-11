import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenService } from 'src/common/token/token';
import { CryptoService } from 'src/common/crypt/Crypto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/core/entity/admin.entity';
import { Owner } from 'src/core/entity/owner.entity';
import { Educator } from 'src/core/entity/educator.entity';
import { Parent } from 'src/core/entity/parent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Owner, Educator, Parent])],
  providers: [AuthService, TokenService, CryptoService],
  exports: [AuthService],
})
export class AuthModule {}
