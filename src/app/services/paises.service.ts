import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PaisesService {

   	countries: any = [];
  	constructor(	private http:HttpClient){
        

  	}

  	getCountries(){
		  console.log("entro");
		return new Observable((observer) => {
			if(this.countries.length){
				observer.next(this.countries);
				observer.complete();
			}else{
				this.http.get('https://restcountries.eu/rest/v2/all').subscribe(
				(data) => {
					this.countries = data;
					observer.next(data);
					observer.complete();
				});
			}
		});
	}
		/*if(this.paises.length <= 0){
			this.http.get('https://restcountries.eu/rest/v2/all').subscribe(
				(data) => {
					this.paises = data;
				}
			);
			return this.paises;
			
		}else{
			console.log("the request has not been made");
			return this.paises;
		}*/
        
        
    

  	getCountry(name:string){
  		return this.http.get(`https://restcountries.eu/rest/v2/name/${name}`);
	  }
	
  	
}
