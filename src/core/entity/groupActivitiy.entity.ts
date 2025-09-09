import { BaseEntity } from 'src/common/database/base.entity';
import { GroupActivityType } from 'src/common/enum/groupActivityType.enum';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Group } from './group.entity';
import { Media } from './media.entity';

@Entity('groupActivity')
export class GroupActivity extends BaseEntity {
  @Column({
    type: 'date',
    nullable: true,
  })
  activityDate: Date;

  @Column({
    type: 'enum',
    enum: GroupActivityType,
    nullable: true,
  })
  activityType: GroupActivity;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  description: string;

  @ManyToOne(() => Group, (group) => group.activities, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  group: Group;

  @OneToMany(() => Media, (media) => media.groupActivity, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  media: Media[]
}
