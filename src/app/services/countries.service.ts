import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../shared/interfaces/api-response.interface';
import { CartItem } from '../shared/interfaces/cart-item.interface';
import { Destination } from '../shared/interfaces/destination.interface';
import { Hotel } from '../shared/interfaces/hotel.interface';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private readonly apiUrl = `${environment.apiUrl}/destinations`;
  private readonly destinationsSubject = new BehaviorSubject<Destination[]>([]);
  readonly destinations$ = this.destinationsSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly cartService: CartService
  ) {
    this.refreshDestinations().subscribe();
  }

  refreshDestinations(): Observable<Destination[]> {
    return this.http.get<ApiResponse<Destination[]>>(this.apiUrl).pipe(
      map((res) => res.data),
      tap((destinations) => this.destinationsSubject.next(destinations)),
      catchError((error) => {
        console.error('[CountriesService] Error fetching destinations from backend:', error);
        return of(this.destinationsSubject.value);
      }),
      shareReplay(1)
    );
  }

  getDestinations(): Observable<Destination[]> {
    if (this.destinationsSubject.value.length > 0) {
      return of(this.destinationsSubject.value);
    }
    return this.refreshDestinations();
  }

  getDestinationsSync(): Destination[] {
    return this.destinationsSubject.value;
  }

  getDestination(cityName: string): Observable<Destination | undefined> {
    const normalized = cityName.trim();
    return this.http
      .get<ApiResponse<Destination>>(`${this.apiUrl}/city/${encodeURIComponent(normalized)}`)
      .pipe(
        tap((res) => console.log(res)),
        map((res) => res.data),
        catchError((error) => {
          console.error(`[CountriesService] Error fetching destination '${cityName}':`, error);
          const cached = this.destinationsSubject.value.find(
            (d) => d.city.toLowerCase() === normalized.toLowerCase()
          );
          return of(cached);
        })
      );
  }

  searchDestinations(term: string): Observable<Destination[]> {
    const normalized = term.trim().toLowerCase();
    return this.getDestinations().pipe(
      map((destinations) => {
        if (!normalized) {
          return destinations;
        }
        return destinations.filter((destination) =>
          destination.city.toLowerCase().includes(normalized)
        );
      })
    );
  }

  // --- Cart Delegation Methods (Maintains backwards compatibility) ---
  shoppingCar(item: Hotel, person: number, dateArrived: Date, dateDeparted: Date): void {
    this.cartService.addItem(item, person, dateArrived, dateDeparted);
  }

  getShoppingItem(): CartItem[] {
    return this.cartService.getItems();
  }

  removeItem(index: number): CartItem[] {
    return this.cartService.removeItem(index);
  }
}
