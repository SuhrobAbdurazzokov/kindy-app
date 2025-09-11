import { PaymentStatus } from 'src/common/enum/paymentStatus.enum';
import { PaymentType } from 'src/common/enum/paymentType.enum';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Kindergarten } from './kindergarten.entity';
import { Notification } from './notification.entity';
import { BaseEntity } from 'src/common/database/base.entity';

@Entity('payment')
export class Payment extends BaseEntity {
  @Column({
    type: 'decimal',
    nullable: true,
  })
  amout: number;

  @Column({
    type: 'enum',
    enum: PaymentType,
    nullable: true,
  })
  paymentType: PaymentType;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'uuid',
    nullable: true,
    unique: true,
  })
  transactionId: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    nullable: true,
  })
  status: PaymentStatus;

  @ManyToOne(() => Kindergarten, (kindergarten) => kindergarten.payments)
  kindergarten: Kindergarten;

  @OneToMany(() => Notification, (notification) => notification.payment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  notification: Notification[];
}
