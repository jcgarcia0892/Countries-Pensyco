import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../../../services/countries.service';
import { FormControl } from '@angular/forms';
import { Destination } from 'src/app/shared/interfaces/destination.interface';
import { filter, map } from 'rxjs';
import { CardComponentInfo } from 'src/app/shared/interfaces/card-component-info.interface';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss']
})
export class DestinationsComponent implements OnInit {

  showMisspell!: boolean;
  destinations: Destination[] = [];

  cardInfo!: CardComponentInfo;

  destinationControl = new FormControl<string>('');

  constructor(private countriesService: CountriesService) { 
    this.destinations = this.countriesService.getDestinations();
            
  }
        
  ngOnInit() {
    this.destinationControl.valueChanges
    .pipe(
      filter((value) => value === null || value?.length === 0),
      map(() => null),
    )
    .subscribe((value) => {
      this.searchDestination(value);
    });
    
  }

  getCardInfo(destination: Destination): CardComponentInfo {
    return {
      img: {
        src: destination.img,
        alt: destination.city,
        title: destination.city,
      },
      actions: {
        icon: null,
        title: 'Go to Hotels',
        route: ['/information/hotels', destination.city],
      }
    }
  };
  

  searchDestination(value: string | null){
    if(!value) {
      this.showMisspell = false;
      this.destinations = this.countriesService.getDestinations();
      return;
    };

    this.destinations = this.destinations.filter((destination) => {
      let cityName = destination.city.toLowerCase();
      return cityName.indexOf(value.toLowerCase()) >= 0;
    });

    if(this.destinations.length === 0){
      this.showMisspell = true;
    }
  };
}
