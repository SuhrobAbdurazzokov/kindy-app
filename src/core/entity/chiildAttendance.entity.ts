import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';
import { Children } from './children.entity';

@Entity('childAttendance')
export class ChildAttendance extends BaseEntity {
  @Column({
    type: 'date',
    nullable: true,
    unique: true,
  })
  date: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  isPresent: boolean;

  @ManyToOne(() => Children, (children) => children.attendance)
  children: Children;
}
