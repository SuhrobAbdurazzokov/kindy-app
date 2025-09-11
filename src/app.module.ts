import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { AdminModule } from './api/admin/admin.module';
import { ChildAttendanceModule } from './api/child-attendance/child-attendance.module';
import { ChildrenModule } from './api/children/children.module';
import { EducatorModule } from './api/educator/educator.module';
import { EducatorAttendanceModule } from './api/educator-attendance/educator-attendance.module';
import { GroupModule } from './api/group/group.module';
import { GroupActivityModule } from './api/group-activity/group-activity.module';
import { KindergartenModule } from './api/kindergarten/kindergarten.module';
import { MediaModule } from './api/media/media.module';
import { NotificationModule } from './api/notification/notification.module';
import { OwnerModule } from './api/owner/owner.module';
import { ParentModule } from './api/parent/parent.module';
import { PaymentModule } from './api/payment/payment.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URI,
      autoLoadEntities: true,
      synchronize: config.DB_SYNC,
    }),
    JwtModule.register({
      global: true,
    }),
    AdminModule,
    ChildAttendanceModule,
    ChildrenModule,
    EducatorModule,
    EducatorAttendanceModule,
    GroupModule,
    GroupActivityModule,
    KindergartenModule,
    MediaModule,
    NotificationModule,
    OwnerModule,
    ParentModule,
    PaymentModule,
  ],
})
export class AppModule {}
