import { Repository } from 'typeorm';
import { Media } from '../entity/media.entity';

export type MediaRepository = Repository<Media>;
