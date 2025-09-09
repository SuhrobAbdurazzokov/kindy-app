import { BaseEntity } from 'src/common/database/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Educator } from './educator.entity';

@Entity('educatorAttendace')
export class EducatorAttendace extends BaseEntity {
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
  isPresent: true;

  @ManyToOne(() => Educator, (educator) => educator.attendance)
  educator: Educator;
}
