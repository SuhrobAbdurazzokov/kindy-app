import { MediaType } from 'src/common/enum/mediaType.enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import { GroupActivity } from './groupActivitiy.entity';
import { BaseEntity } from 'src/common/database/base.entity';

@Entity('media')
export class Media extends BaseEntity {
  @Column({
    type: 'enum',
    enum: MediaType,
    nullable: true,
  })
  mediaType: MediaType;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  mediaUrl: [string];

  @ManyToOne(() => GroupActivity, (groupActivity) => groupActivity.media, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  groupActivity: GroupActivity;
}
