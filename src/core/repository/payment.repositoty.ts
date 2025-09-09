import { Repository } from 'typeorm';
import { Payment } from '../entity/payment.entity';

export type PaymentRepositoy = Repository<Payment>;
