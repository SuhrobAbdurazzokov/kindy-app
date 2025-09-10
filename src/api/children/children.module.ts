import { Module } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { ChildrenController } from './children.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Children } from 'src/core/entity/children.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Children])],
  controllers: [ChildrenController],
  providers: [ChildrenService],
})
export class ChildrenModule {}
