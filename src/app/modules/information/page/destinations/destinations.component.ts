import { Component, OnInit } from '@angular/core';
import { PaisesService } from './../../../../services/paises.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {


	countries:any[] = [];
  countriesCompleted:any = [];
  destinations:any = [];

  constructor(	private countriesService:PaisesService,
  				      private router:Router) { 
            this.countriesService.getCountries()
            .subscribe( (data:any)=>{
              
                this.countries = data;
                this.countriesCompleted = data;
            })

            this.destinations = countriesService.destinations;
            console.log(this.destinations);
            
  }
        
  ngOnInit() {
    
    
  }
  

  goToCountry(name:string){
  	this.router.navigate(['/information/country', name]);
  }

  continentFilter(continent:string){

      this.countries = this.countriesCompleted;
      switch (continent) {
        case "Oceania":
          this.countries = this.countries.filter( element => {
            return element.region === continent;
          })
          break;

        case 'Americas':
          this.countries = this.countries.filter( element => {
            return element.region === continent;
          })
          break;

         case 'Africa':
          this.countries = this.countries.filter( element => {
            return element.region === continent;
          })
          break;

          case 'Asia':
          this.countries = this.countries.filter( element => {
            return element.region === continent;
          })
          break;

        case 'Europe':
          this.countries = this.countries.filter( element => {
            return element.region === continent;
          })
          break;

        case 'Polar':
          this.countries = this.countries.filter( element => {
            return element.region === continent;
          })
          break;
        
        default:
          
          break;
      }


  }

}
