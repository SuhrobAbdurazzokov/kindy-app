import { BaseEntity } from 'src/common/database/base.entity';
import { AccessRoles } from 'src/common/enum/roles.enum';
import { Column, Entity } from 'typeorm';

@Entity('admin')
export class Admin extends BaseEntity {
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
  fullName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: AccessRoles,
    default: AccessRoles.ADMIN,
  })
  role: AccessRoles;

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
}
