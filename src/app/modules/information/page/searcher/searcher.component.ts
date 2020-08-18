import { Component, OnInit } from '@angular/core';
import { PaisesService } from './../../../../services/paises.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  searcher:any[] = [];
  destinations:any;
  name:any = '';
  showEmpty:boolean;
  showMisspell:boolean;
  constructor(	private countryService:PaisesService,
                private router:Router) {

      this.destinations = this.countryService.getDestinations()
      console.log(this.destinations);            
  }

  ngOnInit() {
  }


  searchDestination(word){

    let destinationsArr:any[] = [];
    word = word.toLowerCase();
    this.showEmpty = false;
    this.showMisspell = false;

    if(word.length === 0){

      this.showEmpty = true;
      destinationsArr.splice(0, destinationsArr.length);
  
    }else{

      for(let destination of this.destinations){

        let name = destination.city.toLowerCase();

        if( name.indexOf(word) >= 0 ){
          destinationsArr.push(destination);
        }
        
      }

      if(destinationsArr.length === 0){
        this.showMisspell = true;
      }

      this.showEmpty = false;
      
    }
    this.searcher = destinationsArr;
  }

  goToCountry(name){
    console.log(name);
  }

}
