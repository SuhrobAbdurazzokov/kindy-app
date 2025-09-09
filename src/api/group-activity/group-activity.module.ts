import { Module } from '@nestjs/common';
import { GroupActivityService } from './group-activity.service';
import { GroupActivityController } from './group-activity.controller';

@Module({
  controllers: [GroupActivityController],
  providers: [GroupActivityService],
})
export class GroupActivityModule {}
