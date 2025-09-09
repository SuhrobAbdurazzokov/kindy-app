import { Repository } from 'typeorm';
import { Owner } from '../entity/owner.entity';

export type OwnerRepository = Repository<Owner>;
