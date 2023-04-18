import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../../../services/countries.service';
import { AbstractControl } from '@angular/forms';
import { Destination, Hotel } from 'src/app/shared/interfaces/destination.interface';
import { DateForm } from 'src/app/shared/interfaces/date-form.interface';
import { CardComponentInfo } from 'src/app/shared/interfaces/card-component-info.interface';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {
  
  destination!: Destination | undefined;
  
  minDateArrived = new Date();
  
  minDateDepartured = new Date();
  
  showHotels = false;
  
  errors = false;
  
  person = 1;
  
  dateArrived!: Date;
  
  dateDeparted!: Date;

  forma: FormGroup<DateForm> = this.fb.group({
    arrived: [null,[Validators.required]],
    departed: [null, [Validators.required]]
  });

 	 constructor(	private acRoute:ActivatedRoute,
  				      private countriesService: CountriesService,
                private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.acRoute.params.subscribe( (data) =>{
      this.destination = this.countriesService.getDestination(data['name']);
    });
  }

  addPerson(): any{
    if(this.person < 51){
      return this.person++;
    }
  }

  removePerson(): any{
    if(this.person > 1){
      return this.person--;
    }
  }

  shoppingCar(hotel: Hotel, person: number, dateArrived: Date, dateDeparted: Date){
    this.countriesService.shoppingCar(hotel, person, dateArrived, dateDeparted);
    
  }

  book(): void {
    Object.values(this.forma.controls).forEach((control: AbstractControl) => {
      return control.markAsTouched();
    });
    
    this.dateArrived = this.forma.controls.arrived.value;
    this.dateDeparted = this.forma.controls.departed.value;
    
    
    if(this.dateArrived > this.dateDeparted){
      this.showHotels = false;
      this.errors = true;
    }
    
    if(this.forma.valid){
      this.errors = false;
      this.showHotels = true;
    }
  }

  getCardInfo(hotel: Hotel): CardComponentInfo {
    return {
      img: {
        src: hotel.img,
        alt: hotel.name,
        title: hotel.name,
      },
      actions: {
        icon: 'fa fa-shopping-cart',
        title: 'Add to cart',
        route: ['/information/shopping',],
      }
    }
  }

    /*-------forma-date --------------*/
   
    get arrivedInvalid(){
      return this.forma.controls.arrived?.invalid && this.forma.controls.arrived?.touched;
    }
  
    get departedInvalid(){
      return this.forma.controls.departed?.invalid && this.forma.controls.departed?.touched;
    }

}

