import { Module } from '@nestjs/common';
import { KindergartenService } from './kindergarten.service';
import { KindergartenController } from './kindergarten.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kindergarten } from 'src/core/entity/kindergarten.entity';
import { OwnerModule } from '../owner/owner.module';

@Module({
  imports: [TypeOrmModule.forFeature([Kindergarten]), OwnerModule],
  controllers: [KindergartenController],
  providers: [KindergartenService],
})
export class KindergartenModule {}
