import { EducationLevel } from 'src/common/enum/educationLevel.enum';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Group } from './group.entity';
import { EducatorAttendace } from './educatorAttendance.entity';

@Entity('educator')
export class Educator extends BaseEntity {
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
  })
  password: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthDate: Date;

  @Column({
    type: 'bigint',
    nullable: true,
    unique: true,
  })
  cardNumber: number;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  passportId: string;

  @Column({
    type: 'enum',
    enum: EducationLevel,
    nullable: true,
  })
  educationLevel: EducationLevel;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  phoneNumber: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  photo: string;

  @Column({
    type: 'decimal',
    nullable: true,
  })
  sallary: number;

  @ManyToOne(() => Group, (group) => group.educators)
  group: Group

  @OneToMany(() => EducatorAttendace, (attendance) => attendance.educator, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  attendance: EducatorAttendace[]

}
