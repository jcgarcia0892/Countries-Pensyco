import { Component, OnInit } from '@angular/core';
import { PaisesService } from './../../../services/paises.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {


	countries:any[] = [];
  countriesCompleted:any = [];

  constructor(	private countriesService:PaisesService,
  				private router:Router) { 
            this.countriesService.getCountries()
            .subscribe( (data:any)=>{
              
                this.countries = data;
                console.log(data);
                this.countriesCompleted = data;
        
            })
          
        }
        
  ngOnInit() {
    
    
  }
  

  goToCountry(name:string){
  	this.router.navigate(['/country', name]);
  }

  goToMenu(){
    this.router.navigate(['/menu']);
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
