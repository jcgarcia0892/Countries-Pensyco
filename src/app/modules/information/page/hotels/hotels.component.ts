import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaisesService } from './../../../../services/paises.service';



@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  country:any;
  destination:any = {};


 	 constructor(	private acRoute:ActivatedRoute,
  				      private CountriesService:PaisesService,
                private router:Router) {

                  
   
   }

  ngOnInit() {
   
    this.acRoute.params.subscribe( (data) =>{
      this.destination = this.CountriesService.getDestination(data['name']);
      console.log(this.destination);
    });


  }


  addPerson(name:string){
    for(let hotel of this.destination.hotels){
        if(name === hotel.name){
          if(hotel.person <= 50){
            return hotel.person++;
          }
        }
      }
  }

  subsPerson(name:string){
    for(let hotel of this.destination.hotels){
      if(hotel.name === name){
        if(hotel.person > 1){
          return hotel.person--;
        }
      }
    }
  }

  shoppingCar(hotel){
    this.CountriesService.shoppingCar(hotel);

  }



}

