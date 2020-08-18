import { Component, OnInit } from '@angular/core';
import { PaisesService } from './../../../../services/paises.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {


  destinations:any = [];

  constructor(	private countriesService:PaisesService,
  				      private router:Router) { 
          
            this.destinations = this.countriesService.getDestinations();
            console.log(this.destinations);
            
  }
        
  ngOnInit() {
    
    
  }
  

  goToCountry(name:string){
  	this.router.navigate(['/information/country', name]);
  }

 

}
