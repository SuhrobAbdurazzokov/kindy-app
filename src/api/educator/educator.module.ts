import { Module } from '@nestjs/common';
import { EducatorService } from './educator.service';
import { EducatorController } from './educator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Educator } from 'src/core/entity/educator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Educator])],
  controllers: [EducatorController],
  providers: [EducatorService],
})
export class EducatorModule {}
