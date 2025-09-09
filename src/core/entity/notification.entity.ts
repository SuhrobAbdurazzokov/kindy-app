import { BaseEntity } from 'src/common/database/base.entity';
import { NotificationType } from 'src/common/enum/notificationType.enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Parent } from './parent.entity';
import { Payment } from './payment.entity';

@Entity('notification')
export class Notification extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: true,
  })
  message: string;

  @Column({
    type: 'enum',
    enum: NotificationType,
    nullable: true,
  })
  type: NotificationType;

  @ManyToOne(() => Parent, (parent) => parent.notifications)
  parent: Parent;

  @ManyToOne(() => Payment, (payment) => payment.notification)
  payment: Payment;
}
