import { Hotel } from './hotel.interface';

export interface CartItem extends Hotel {
  readonly person: number;
  readonly date1: Date;
  readonly date2: Date;
}
