import { BaseEntity } from 'src/common/database/base.entity';
import { Gender } from 'src/common/enum/gender.enum';
import { Nationality } from 'src/common/enum/nationality.enum';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Group } from './group.entity';
import { ChildAttendance } from './chiildAttendance.entity';
import { Parent } from './parent.entity';

@Entity('children')
export class Children extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: true,
  })
  fullName: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthDate: Date;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  STIR: string;

  @Column({
    type: 'enum',
    enum: Nationality,
    default: Nationality.UZBEK,
    nullable: true,
  })
  nationality: Nationality;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  photo: string;

  @Column({
    type: 'decimal',
    nullable: true,
  })
  monthlySum: number;

  @ManyToOne(() => Group, (group) => group.childrens)
  group: Group;

  @OneToMany(() => ChildAttendance, (attendance) => attendance.children, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  attendance: ChildAttendance[];

  @ManyToOne(() => Parent, (parent) => parent.childrens)
  parent: Parent;
}
