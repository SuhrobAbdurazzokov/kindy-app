import { Repository } from 'typeorm';
import { Kindergarten } from '../entity/kindergarten.entity';

export type KindergartenRepository = Repository<Kindergarten>;
