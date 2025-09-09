import { Module } from '@nestjs/common';
import { KindergartenService } from './kindergarten.service';
import { KindergartenController } from './kindergarten.controller';

@Module({
  controllers: [KindergartenController],
  providers: [KindergartenService],
})
export class KindergartenModule {}
