import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../shared/interfaces/cart-item.interface';
import { Hotel } from '../shared/interfaces/hotel.interface';
import { StorageService } from './storage.service';

const CART_STORAGE_KEY = 'data';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _items$ = new BehaviorSubject<CartItem[]>([]);

  readonly items$: Observable<CartItem[]> = this._items$.asObservable();

  readonly totalPrice$: Observable<number> = this.items$.pipe(
    map((items) => items.reduce((total, item) => total + item.person * item.price, 0))
  );

  readonly count$: Observable<number> = this.items$.pipe(
    map((items) => items.length)
  );

  constructor(private readonly storageService: StorageService) {
    this.loadFromStorage();
  }

  getItems(): CartItem[] {
    return this._items$.getValue();
  }

  getTotalPrice(): number {
    return this.getItems().reduce((total, item) => total + item.person * item.price, 0);
  }

  addItem(hotel: Hotel, person: number, dateArrived: Date, dateDeparted: Date): void {
    const newItem: CartItem = {
      ...hotel,
      person,
      date1: dateArrived,
      date2: dateDeparted
    };

    const updatedItems = [...this._items$.getValue(), newItem];
    this.updateState(updatedItems);
  }

  removeItem(index: number): CartItem[] {
    const currentItems = this._items$.getValue();
    if (index < 0 || index >= currentItems.length) {
      return currentItems;
    }

    const updatedItems = currentItems.filter((_, i) => i !== index);
    this.updateState(updatedItems);
    return updatedItems;
  }

  clear(): void {
    this.updateState([]);
  }

  private updateState(items: CartItem[]): void {
    this._items$.next(items);
    this.storageService.setItem(CART_STORAGE_KEY, items);
  }

  private loadFromStorage(): void {
    const storedItems = this.storageService.getItem<CartItem[]>(CART_STORAGE_KEY, []);
    this._items$.next(Array.isArray(storedItems) ? storedItems : []);
  }
}
