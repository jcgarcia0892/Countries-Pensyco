import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaisesService } from './../../../../services/paises.service';



@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {
	country:any;
 	 constructor(	private acRoute:ActivatedRoute,
  				      private CountriesService:PaisesService,
                private router:Router) {

   }

  ngOnInit() {
  	this.acRoute.params.subscribe((data)=>{
  		
  		this.CountriesService.getCountry(data['name'])
  			.subscribe((resp:any)=>{
  				this.country = resp;
  					console.log(this.country);
  			})
  		})
  }


  goBackToCountries(){
    this.router.navigate(['/countries']);
  }
  goBackToSearcher(){
    this.router.navigate(['/searcher']);
  }
}
