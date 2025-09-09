import { BaseEntity } from 'src/common/database/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Children } from './children.entity';
import { Notification } from './notification.entity';

@Entity('parent')
export class Parent extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: true,
  })
  fullName: string;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  login: string;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  phonrNumber: string;

  @Column({
    type: 'bigint',
    nullable: true,
    unique: true,
  })
  cardNumber: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  password: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => Children, (childrens) => childrens.parent, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  childrens: Children[];

  @OneToMany(() => Notification, (notifications) => notifications.parent, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  notifications: Notification[];
}
