import { Module } from '@nestjs/common';
import { GroupActivityService } from './group-activity.service';
import { GroupActivityController } from './group-activity.controller';
import { GroupActivity } from 'src/core/entity/groupActivitiy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GroupActivity])],
  controllers: [GroupActivityController],
  providers: [GroupActivityService],
})
export class GroupActivityModule {}
