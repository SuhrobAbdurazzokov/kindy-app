import { Repository } from 'typeorm';
import { Educator } from '../entity/educator.entity';

export type EducatorRepository = Repository<Educator>;
