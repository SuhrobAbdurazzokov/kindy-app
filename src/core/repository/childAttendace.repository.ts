import { Repository } from 'typeorm';
import { ChildAttendance } from '../entity/chiildAttendance.entity';

export type ChildAttendanceRepository = Repository<ChildAttendance>;
