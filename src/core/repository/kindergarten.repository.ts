import { Repository } from 'typeorm';
import { Kindergarten } from '../entity/kindergarten.repository';

export type KindergartenRepository = Repository<Kindergarten>;
