import { Repository } from 'typeorm';
import { Group } from '../entity/group.entity';

export type GroupRepository = Repository<Group>;
