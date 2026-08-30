import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Destination } from 'src/app/shared/interfaces/destination.interface';
import { Hotel } from 'src/app/shared/interfaces/hotel.interface';
import { DateForm } from 'src/app/shared/interfaces/date-form.interface';
import { CardComponentInfo } from 'src/app/shared/interfaces/card-component-info.interface';
import { CardInfoMapper } from 'src/app/shared/mappers/card-info.mapper';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { CartService } from '../../../../services/cart.service';
import { CountriesService } from '../../../../services/countries.service';

export interface HotelViewModel {
  readonly hotel: Hotel;
  readonly cardInfo: CardComponentInfo;
}

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  standalone: false
})
export class HotelsComponent implements OnInit, OnDestroy {
  destination: Destination | undefined;
  hotelViewModels: HotelViewModel[] = [];

  readonly minDateArrived = new Date();
  readonly minDateDepartured = new Date();

  showHotels = false;
  errors = false;
  person = 1;

  dateArrived: Date | null = null;
  dateDeparted: Date | null = null;

  readonly forma: FormGroup<DateForm> = new FormGroup<DateForm>({
    arrived: new FormControl<Date | null>(null, [Validators.required]),
    departed: new FormControl<Date | null>(null, [Validators.required])
  }, {
    validators: [CustomValidators.dateOrder('arrived', 'departed')]
  });

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly countriesService: CountriesService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const cityName = params['name'];
        this.destination = this.countriesService.getDestination(cityName);
        this.hotelViewModels = (this.destination?.hotels ?? []).map((hotel) => ({
          hotel,
          cardInfo: CardInfoMapper.fromHotel(hotel)
        }));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addPerson(): void {
    if (this.person < 50) {
      this.person++;
    }
  }

  removePerson(): void {
    if (this.person > 1) {
      this.person--;
    }
  }

  shoppingCar(hotel: Hotel, person: number, dateArrived: Date | null, dateDeparted: Date | null): void {
    if (!dateArrived || !dateDeparted) {
      return;
    }
    this.cartService.addItem(hotel, person, dateArrived, dateDeparted);
  }

  book(): void {
    this.forma.markAllAsTouched();

    this.dateArrived = this.forma.controls.arrived.value;
    this.dateDeparted = this.forma.controls.departed.value;

    if (this.forma.hasError('invalidDateRange') || (this.dateArrived && this.dateDeparted && this.dateArrived > this.dateDeparted)) {
      this.showHotels = false;
      this.errors = true;
      return;
    }

    if (this.forma.valid) {
      this.errors = false;
      this.showHotels = true;
    } else {
      this.showHotels = false;
    }
  }

  getCardInfo(hotel: Hotel): CardComponentInfo {
    return CardInfoMapper.fromHotel(hotel);
  }

  get arrivedInvalid(): boolean {
    const ctrl = this.forma.controls.arrived;
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  get departedInvalid(): boolean {
    const ctrl = this.forma.controls.departed;
    return !!(ctrl?.invalid && ctrl?.touched);
  }
}
