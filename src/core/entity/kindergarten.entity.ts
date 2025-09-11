import { BaseEntity } from 'src/common/database/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Owner } from './owner.entity';
import { Group } from './group.entity';
import { Payment } from './payment.entity';

@Entity('kindergarten')
export class Kindergarten extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  address: string;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  licenseNumber: string;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  STIR: string;

  @Column({
    type: 'bigint',
    nullable: true,
    unique: true,
  })
  cardNumber: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;

  @ManyToOne(() => Owner, (owner) => owner.kindergarten, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  owner: Owner;

  @OneToMany(() => Group, (groups) => groups.kindergarten, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  groups: Group[];

  @OneToMany(() => Payment, (payments) => payments.kindergarten, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  payments: Payment[];
}
