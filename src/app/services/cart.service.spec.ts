import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { StorageService } from './storage.service';
import { Hotel } from '../shared/interfaces/hotel.interface';

describe('CartService', () => {
  let service: CartService;
  let storageService: StorageService;

  const mockHotel: Hotel = {
    name: 'Grand Test Hotel',
    adress: '123 Main St',
    qualification: '9.0',
    img: 'test.jpg',
    person: 1,
    price: 200
  };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [CartService, StorageService]
    });
    service = TestBed.inject(CartService);
    storageService = TestBed.inject(StorageService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created with initial empty state or stored items', () => {
    expect(service).toBeTruthy();
    expect(service.getItems().length).toBe(0);
  });

  it('should add an item and update reactive state and totalPrice', (done) => {
    const arrived = new Date('2026-09-01');
    const departed = new Date('2026-09-05');

    service.addItem(mockHotel, 2, arrived, departed);

    expect(service.getItems().length).toBe(1);
    expect(service.getItems()[0].person).toBe(2);
    expect(service.getTotalPrice()).toBe(400);

    service.totalPrice$.subscribe((total) => {
      expect(total).toBe(400);
      done();
    });
  });

  it('should remove an item correctly', () => {
    const arrived = new Date('2026-09-01');
    const departed = new Date('2026-09-05');

    service.addItem(mockHotel, 1, arrived, departed);
    service.addItem({ ...mockHotel, name: 'Second Hotel', price: 300 }, 1, arrived, departed);

    expect(service.getItems().length).toBe(2);

    service.removeItem(0);
    expect(service.getItems().length).toBe(1);
    expect(service.getItems()[0].name).toBe('Second Hotel');
  });

  it('should clear all items in cart', () => {
    const arrived = new Date('2026-09-01');
    const departed = new Date('2026-09-05');

    service.addItem(mockHotel, 1, arrived, departed);
    expect(service.getItems().length).toBe(1);

    service.clear();
    expect(service.getItems().length).toBe(0);
    expect(service.getTotalPrice()).toBe(0);
  });
});
