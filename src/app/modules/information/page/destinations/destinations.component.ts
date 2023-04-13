import { Component, OnInit } from '@angular/core';
import { PaisesService } from './../../../../services/paises.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {

  showEmpty!: boolean;
  showMisspell!: boolean;
  destinations:any = [];

  constructor(	private countriesService:PaisesService,
  				      private router:Router) { 
          
            this.destinations = this.countriesService.getDestinations();
            
  }
        
  ngOnInit() {
    
    
  }
  

  searchDestination(word: string){

    let destinationsArr:any[] = [];
    word = word.toLowerCase();
    this.showMisspell = false;

    if(word.length === 0){
      this.showMisspell = false;
      this.destinations = this.countriesService.getDestinations();
  
    }else{

      this.destinations = this.destinations.filter((destination: any) => {
        let name = destination.city.toLowerCase();
        return name.indexOf(word) >= 0;
      })
      
      if(this.destinations.length === 0){
      
        this.showMisspell = true;
        this.showEmpty = false;
      }

    }
  }

  showAll(){
    this.showEmpty = false;
    this.showMisspell = false;
    this.destinations = this.countriesService.getDestinations();
  }

}
