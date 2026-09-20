import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { Destination } from 'src/app/shared/interfaces/destination.interface';
import { CardComponentInfo } from 'src/app/shared/interfaces/card-component-info.interface';
import { CardInfoMapper } from 'src/app/shared/mappers/card-info.mapper';
import { CountriesService } from '../../../../services/countries.service';

export interface DestinationViewModel {
  readonly destination: Destination;
  readonly cardInfo: CardComponentInfo;
}

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss'],
  standalone: false
})
export class DestinationsComponent implements OnInit, OnDestroy {
  showMisspell = false;
  destinationViewModels: DestinationViewModel[] = [];
  readonly destinationControl = new FormControl<string>('', { nonNullable: true });

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly countriesService: CountriesService) {}

  ngOnInit(): void {
    this.destinationControl.valueChanges
      .pipe(
        startWith(this.destinationControl.value),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((searchTerm) =>
          this.countriesService.searchDestinations(searchTerm ?? '').pipe(
            map((destinations) => ({ searchTerm, destinations }))
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(({ searchTerm, destinations }) => {
        const term = searchTerm?.trim() ?? '';
        this.destinationViewModels = destinations.map((dest) => ({
          destination: dest,
          cardInfo: CardInfoMapper.fromDestination(dest)
        }));

        this.showMisspell = term.length > 0 && this.destinationViewModels.length === 0;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterDestinations(searchTerm: string | null): void {
    const term = searchTerm?.trim() ?? '';
    this.countriesService
      .searchDestinations(term)
      .pipe(takeUntil(this.destroy$))
      .subscribe((destinations) => {
        this.destinationViewModels = destinations.map((dest) => ({
          destination: dest,
          cardInfo: CardInfoMapper.fromDestination(dest)
        }));

        this.showMisspell = term.length > 0 && this.destinationViewModels.length === 0;
      });
  }

  searchDestination(searchTerm: string | null): void {
    this.filterDestinations(searchTerm);
  }

  getCardInfo(destination: Destination): CardComponentInfo {
    return CardInfoMapper.fromDestination(destination);
  }

  // Getter for template backwards compatibility if needed
  get destinations(): Destination[] {
    return this.destinationViewModels.map((vm) => vm.destination);
  }
}
