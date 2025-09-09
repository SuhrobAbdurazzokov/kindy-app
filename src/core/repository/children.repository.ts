import { Repository } from 'typeorm';
import { Children } from '../entity/children.entity';

export type ChildrenRepository = Repository<Children>;
