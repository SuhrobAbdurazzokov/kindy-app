import { BaseEntity } from 'src/common/database/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Kindergarten } from './kindergarten.entity';
import { GroupActivity } from './groupActivitiy.entity';
import { Children } from './children.entity';
import { Educator } from './educator.entity';

@Entity('group')
export class Group extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: true,
  })
  name: string;

  @ManyToOne(() => Kindergarten, (kindergarten) => kindergarten.groups, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  kindergarten: Kindergarten;

  @OneToMany(() => GroupActivity, (activities) => activities.group, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  activities: GroupActivity[];

  @OneToMany(() => Children, (childrens) => childrens.group, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  childrens: Children[];

  @OneToMany(() => Educator, (educators) => educators.group, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  educators: Educator[];
}
