import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})


export class PaisesService {
	shoppingItem:any;
	shoppingItemsArr:any = [];

	destinations: any = [
		{
			city: 'Miami',
			img: './../../../../../assets/img/destination-miami.jpg',
			id: 0,
			hotels: [{
				name: 'Novotel Miami Brickel',
				adress: 'Miami, Downtown 565',
				qualification: '8.2',
				img: './../../../../../assets/img/destination-miami-hotel-1.jpg',
				person: 1,
				price: 857531
			},{
				name: 'Nuvo Suites Miami Airport',
				adress: 'Miami, Kennedy street 547',
				qualification: '8.7',
				img: './../../../../../assets/img/destination-miami-hotel-2.jpg',
				person: 1,
				price: 845206
			},
			{
				name: 'Best Western Gateway to the Keys',
				adress: 'Miami, Theodore Rossevelt 222',
				qualification: '7.2',
				img: './../../../../../assets/img/destination-miami-hotel-3.jpg',
				person: 1,
				price: 777554
			},
			{
				name: 'Turnberry Isle Miami',
				adress: 'Miami, Aventure Krock',
				qualification: '7.6',
				img: './../../../../../assets/img/destination-miami-hotel-4.jpg',
				person: 1,
				price: 1519226
			},
			{
				name: 'Element Miami Doral',
				adress: 'Miami, Underwood Av. 113',
				qualification: '8.5',
				img: './../../../../../assets/img/destination-miami-hotel-5.jpg',
				person: 1,
				price: 828355
			},
			{
				name: 'Hyatt Regency Miami',
				adress: 'Miami, Downtown Square 086',
				qualification: '7.7',
				img: './../../../../../assets/img/destination-miami-hotel-6.jpg',
				person: 1,
				price: 1202085
			}]
		},
		{
			city: 'Cancun',
			img: './../../../../../assets/img/destination-miami.jpg',
			id: 1,
			hotels: [{
				name: 'Emporio Cancun',
				adress: 'Cancun, Plaza 452',
				qualification: '7.9',
				img: './../../../../../assets/img/destination-miami-hotel-1.jpg',
				person: 1,
				price: 633217
			},]
		},
		{
			city: 'Buenos Aires',
			img: './../../../../../assets/img/destination-miami.jpg',
			id: 2,
			hotels: [{
				name: 'Novotel, Miami Brickel',
				adress: 'Miami, Downtown Miami',
				qualification: '8.5',
				img: './../../../../../assets/img/destination-miami-hotel-1.jpg'
			},]
		},
		{
			city: 'Orlando',
			img: './../../../../../assets/img/destination-miami.jpg',
			id: 3,
			hotels: [{
				name: 'Novotel, Miami Brickel',
				adress: 'Miami, Downtown Miami',
				qualification: '8.5',
				img: './../../../../../assets/img/destination-miami-hotel-1.jpg'
			},]
		},
		{
			city: 'Madrid',
			img: './../../../../../assets/img/destination-miami.jpg',
			id: 4,
			hotels: [{
				name: 'Novotel, Miami Brickel',
				adress: 'Miami, Downtown Miami',
				qualification: '8.5',
				img: './../../../../../assets/img/destination-miami-hotel-1.jpg'
			},]
		},
		{
			city: 'Paris',
			img: './../../../../../assets/img/destination-miami.jpg',
			id: 5,
			hotels: [{
				name: 'Novotel, Miami Brickel',
				adress: 'Miami, Downtown Miami',
				qualification: '8.5',
				img: './../../../../../assets/img/destination-miami-hotel-1.jpg'
			},]
		}
	];
	countries: any = [];
	constructor(	private http:HttpClient){
		
        this.cargarStorage();

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
		}
        
        
    

  	getCountry(name:string){
  		return this.http.get(`https://restcountries.eu/rest/v2/name/${name}`);
	  }*/

	getDestination(name:string){
		let destinationObj = {};
		for(let destination of this.destinations){
			if(destination.city === name){
				destinationObj = destination;
			}

		}

		return destinationObj;
	}

	shoppingCar(item:any){
		this.shoppingItem = item;
		console.log(this.shoppingItem);
	}
	
	shoppingList(){
		if(this.shoppingItem !== undefined){
			this.shoppingItemsArr.push(this.shoppingItem);

		}
		this.guardarStorage();
		return this.shoppingItemsArr;
	}

	guardarStorage(){
		localStorage.setItem('data', JSON.stringify(this.shoppingItemsArr));
	}

	cargarStorage(){
		if( localStorage.getItem('data') ){
			this.shoppingItemsArr = JSON.parse(localStorage.getItem('data'));
		}
	}

  	
}
