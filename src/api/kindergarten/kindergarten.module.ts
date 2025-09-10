import { Module } from '@nestjs/common';
import { KindergartenService } from './kindergarten.service';
import { KindergartenController } from './kindergarten.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kindergarten } from 'src/core/entity/kindergarten.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Kindergarten])],
  controllers: [KindergartenController],
  providers: [KindergartenService],
})
export class KindergartenModule {}
