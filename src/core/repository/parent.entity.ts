import { Repository } from 'typeorm';
import { Parent } from '../entity/parent.entity';

export type ParentRepository = Repository<Parent>;
