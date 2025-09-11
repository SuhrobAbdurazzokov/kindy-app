import { BaseEntity } from 'src/common/database/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Kindergarten } from './kindergarten.entity';

@Entity('owner')
export class Owner extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  login: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  password: string;

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
  passportId: string;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  phoneNumber: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;

  @OneToMany(() => Kindergarten, (kindergarten) => kindergarten.owner, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  kindergarten: Kindergarten[];
}
