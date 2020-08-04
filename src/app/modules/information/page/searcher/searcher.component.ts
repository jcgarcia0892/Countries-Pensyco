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
  countries:any;
  name:any = '';
  showEmpty:boolean;
  showMisspell:boolean;
  constructor(	private countryService:PaisesService,
                private router:Router) {

    this.countryService.getCountries()
      .subscribe( (data:any)=>{
        this.countries = data;
      })
    }

  ngOnInit() {
  }


  searchCountry(word){

    let countriesArr:any[] = [];
    word = word.toLowerCase();
    this.showEmpty = false;
    this.showMisspell = false;

    if(word.length === 0){

      this.showEmpty = true;
      countriesArr.splice(0, countriesArr.length);
  
    }else{

      for(let country of this.countries){

        let name = country.name.toLowerCase();

        if( name.indexOf(word) >= 0 ){
          countriesArr.push(country);
        }
        
      }

      if(countriesArr.length === 0){
        this.showMisspell = true;
      }

      this.showEmpty = false;
      
    }
    this.searcher = countriesArr;
  }

  goToMenu(){
    this.router.navigate(['/menu']);

  }
  
  goToCountry(name:string){
    this.router.navigate(['/country', name]);
  }

}
