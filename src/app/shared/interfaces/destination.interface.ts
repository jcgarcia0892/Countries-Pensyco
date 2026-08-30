import { Hotel } from './hotel.interface';

export interface Destination {
  readonly id: number;
  readonly city: string;
  readonly img: string;
  readonly places: readonly string[];
  readonly hotels: readonly Hotel[];
}

// Re-exports for backwards compatibility
export * from './hotel.interface';
export * from './cart-item.interface';