import { Injectable } from '@angular/core';
import { Destination, Hotel } from '../shared/interfaces/destination.interface';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {
	shoppingItem!: Hotel;
	shoppingItemsArr: Hotel[] = [];

	destinations: Destination[] = [
		{
			city: 'Miami',
			img: './../../../../../assets/img/destination-miami/destination-miami.jpg',
			id: 0,
			places: ['Ocean Drive', 'Little Havana', 'Design Distric', 'Coral Gables'],
			hotels: [{
				name: 'Novotel Miami Brickel',
				adress: 'Miami, Downtown 565',
				qualification: '8.2',
				img: './../../../../../assets/img/destination-miami/destination-miami-hotel-1.jpg',
				person: 1,
				price: 857531
			},{
				name: 'Nuvo Suites Miami Airport',
				adress: 'Miami, Kennedy street 547',
				qualification: '8.7',
				img: './../../../../../assets/img/destination-miami/destination-miami-hotel-2.jpg',
				person: 1,
				price: 845206
			},
			{
				name: 'Best Western Gateway to the Keys',
				adress: 'Miami, Theodore Rossevelt 222',
				qualification: '7.2',
				img: './../../../../../assets/img/destination-miami/destination-miami-hotel-3.jpg',
				person: 1,
				price: 777554
			},
			{
				name: 'Turnberry Isle Miami',
				adress: 'Miami, Aventure Krock',
				qualification: '7.6',
				img: './../../../../../assets/img/destination-miami/destination-miami-hotel-4.jpg',
				person: 1,
				price: 1519226
			},
			{
				name: 'Element Miami Doral',
				adress: 'Miami, Underwood Av. 113',
				qualification: '8.5',
				img: './../../../../../assets/img/destination-miami/destination-miami-hotel-5.jpg',
				person: 1,
				price: 828355
			},
			{
				name: 'Hyatt Regency Miami',
				adress: 'Miami, Downtown Square 086',
				qualification: '7.7',
				img: './../../../../../assets/img/destination-miami/destination-miami-hotel-6.jpg',
				person: 1,
				price: 1202085
			}]
		},
		{
			city: 'Cancun',
			img: './../../../../../assets/img/destination-cancun/destination-cancun.jpg',
			id: 1,
			places: ['Mayan Ruins', 'Cenotes Route', 'Xel Ha Park', 'Quintana Roo'],
			hotels: [{
				name: 'Emporio Cancun',
				adress: 'Cancun, square 452',
				qualification: '7.9',
				img: './../../../../../assets/img/destination-cancun/destination-cancun-hotel-1.jpg',
				person: 1,
				price: 397927
			},
			{
				name: 'Secrets The Vine Cancún',
				adress: 'Cancun, Hotel Zone 011',
				qualification: '8.3',
				img: './../../../../../assets/img/destination-cancun/destination-cancun-hotel-2.jpg',
				person: 1,
				price: 320060
			},
			{
				name: 'Temptation Cancun Resort',
				adress: 'Cancun, Boulevard Kukulcan 364',
				qualification: '8.0',
				img: './../../../../../assets/img/destination-cancun/destination-cancun-hotel-3.jpg',
				person: 1,
				price: 319028
			},
			{
				name: 'Hyatt Ziva Cancún',
				adress: 'Cancun, Mountain Corner 353',
				qualification: '7.5',
				img: './../../../../../assets/img/destination-cancun/destination-cancun-hotel-4.jpg',
				person: 1,
				price: 359990
			},
			{
				name: 'The Grand At Moon Palace',
				adress: 'Cancun, Boulevard Kukulcan 088',
				qualification: '8.4',
				img: './../../../../../assets/img/destination-cancun/destination-cancun-hotel-5.jpg',
				person: 1,
				price: 283906
			},
			{
				name: 'Hotel NYX Cancun',
				adress: 'Cancun, Boulevard Kukulcan 035',
				qualification: '8.9',
				img: './../../../../../assets/img/destination-cancun/destination-cancun-hotel-6.jpg',
				person: 1,
				price: 652103
			}]
		},
		{
			city: 'Buenos Aires',
			img: './../../../../../assets/img/destination-buenosA/destination-buenosA.jpg',
			id: 2,
			places: ['Colon Teather', 'Ateneo Grand Esplendid', 'Metropolitan Cathedral', 'Obelisk'],
			hotels: [{
				name: 'Eurobuilding Hotel Boutique Buenos Aires',
				adress: 'Buenos Aires, Lima street 187',
				qualification: '7.5',
				img: './../../../../../assets/img/destination-buenosA/destination-buenosA-hotel-1.jpg',
				person: 1,
				price: 107836
			},
			{
				name: 'Faena Hotel Buenos Aires',
				adress: 'Buenos Aires, Martha Salotti 445',
				qualification: '8.0',
				img: './../../../../../assets/img/destination-buenosA/destination-buenosA-hotel-2.jpg',
				person: 1,
				price: 279271
			},
			{
				name: 'Park Tower Buenos Aires',
				adress: 'Buenos Aires, Leandro Alem street 119',
				qualification: '8.8',
				img: './../../../../../assets/img/destination-buenosA/destination-buenosA-hotel-3.jpg',
				person: 1,
				price: 156576
			},
			{
				name: 'CasaSur Bellini Hotel',
				adress: 'Buenos Aires, Cabello street 3780',
				qualification: '8.5',
				img: './../../../../../assets/img/destination-buenosA/destination-buenosA-hotel-4.jpg',
				person: 1,
				price: 261213
			},
			{
				name: 'Palladio Hotel Buenos Aires',
				adress: 'Buenos Aires, Callao street 924',
				qualification: '8.4',
				img: './../../../../../assets/img/destination-buenosA/destination-buenosA-hotel-5.jpg',
				person: 1,
				price: 164902
			},
			{
				name: 'Casa Sur Recoleta',
				adress: 'Buenos Aires, Callao street 1823',
				qualification: '8.2',
				img: './../../../../../assets/img/destination-buenosA/destination-buenosA-hotel-6.jpg',
				person: 1,
				price: 183352
			}]
		},
		{
			city: 'Orlando',
			img: './../../../../../assets/img/destination-orlando/destination-orlando.jpg',
			id: 3,
			places: ['Kenndy Space Center', 'Sea Life Aquarium', 'Islands of Adventure Park', 'Harry Potter Park'],
			hotels: [{
				name: 'Marriott Orlando Airport Lakeside',
				adress: 'Orlando, Augusta National Dr 7499',
				qualification: '8.9',
				img: './../../../../../assets/img/destination-orlando/destination-orlando-hotel-1.jpg',
				person: 1,
				price: 178628
			},
			{
				name: 'Waldorf Astoria Orlando',
				adress: 'Orlando, Bonne Creek Lane 14200',
				qualification: '8.0',
				img: './../../../../../assets/img/destination-orlando/destination-orlando-hotel-2.jpg',
				person: 1,
				price: 386738
			},
			{
				name: 'Avanti International Resort',
				adress: 'Orlando, Drive International 8738',
				qualification: '8.3',
				img: './../../../../../assets/img/destination-orlando/destination-orlando-hotel-3.jpg',
				person: 1,
				price: 222488
			},
			{
				name: 'Marriott Sabal Palms',
				adress: 'Orlando, World Center Dr 8805',
				qualification: '8.8',
				img: './../../../../../assets/img/destination-orlando/destination-orlando-hotel-4.jpg',
				person: 1,
				price: 95056
			},
			{
				name: 'Rosen Shingle Creek',
				adress: 'Orlando, Universal Boulevard 9939',
				qualification: '7.9',
				img: './../../../../../assets/img/destination-orlando/destination-orlando-hotel-5.jpg',
				person: 1,
				price: 126764
			},
			{
				name: 'Countryside Inn & Suites',
				adress: 'Orlando, Lee Dr 606',
				qualification: '8.2',
				img: './../../../../../assets/img/destination-orlando/destination-orlando-hotel-6.jpg',
				person: 1,
				price: 115285
			}]
		},
		{
			city: 'Madrid',
			img: './../../../../../assets/img/destination-madrid/destination-madrid.jpg',
			id: 4,
			places: ['Real Palace', 'National Archaeological Museum', 'Moncloa Lighthouse', 'Neighborhood of Letters'],
			hotels: [{
				name: 'Bless Hotel Madrid',
				adress: 'Madrid, Velazquez street 62',
				qualification: '7.7',
				img: './../../../../../assets/img/destination-madrid/destination-madrid-hotel-1.jpg',
				person: 1,
				price: 216267
			},
			{
				name: 'CoolRooms Atocha',
				adress: 'Madrid, Atochaz street 34',
				qualification: '7.0',
				img: './../../../../../assets/img/destination-madrid/destination-madrid-hotel-2.jpg',
				person: 1,
				price: 252379
			},
			{
				name: 'URSO Hotel & Spa',
				adress: 'Madrid, Mejia Lequerica street 8',
				qualification: '8.5',
				img: './../../../../../assets/img/destination-madrid/destination-madrid-hotel- 3.jpg',
				person: 1,
				price: 251774
			},
			{
				name: 'The Pavilions Madrid',
				adress: 'Madrid, Amador De los Rios street 3',
				qualification: '8.1',
				img: './../../../../../assets/img/destination-madrid/destination-madrid-hotel-4.jpg',
				person: 1,
				price: 258481
			},
			{
				name: 'The Principal Madrid',
				adress: 'Madrid, Marques de Valedinglesias street 1',
				qualification: '9.0',
				img: './../../../../../assets/img/destination-madrid/destination-madrid-hotel-5.jpg',
				person: 1,
				price: 247433
			},
			{
				name: 'The Pavilions Madrid',
				adress: 'Madrid, Amador de los Rios street 10',
				qualification: '7.7',
				img: './../../../../../assets/img/destination-madrid/destination-madrid-hotel-6.jpg',
				person: 1,
				price: 262626
			}]
		},
		{
			city: 'Paris',
			img: './../../../../../assets/img/destination-paris/destination-paris.jpg',
			id: 5,
			places: ['Eiffel Tower', 'Arc de Triomphe in Paris', 'Notre Dame Cathedral', 'Pont Neuf'],
			hotels: [{
				name: 'Le Royal Monceau - Raffles Paris',
				adress: 'Paris, Hoche Avenue 37',
				qualification: '8.8',
				img: './../../../../../assets/img/destination-paris/destination-paris-hotel-1.jpg',
				person: 1,
				price: 651139
			},
			{
				name: 'The Peninsula Paris',
				adress: 'Paris, Klebert Avenue 19',
				qualification: '7.4',
				img: './../../../../../assets/img/destination-paris/destination-paris-hotel-2.jpg',
				person: 1,
				price: 911595
			},
			{
				name: 'La Reserve Paris - Hotel and Spa',
				adress: 'Paris, Gabriel Avenue 42',
				qualification: '8.6',
				img: './../../../../../assets/img/destination-paris/destination-paris-hotel-3.jpg',
				person: 1,
				price: 824776
			},
			{
				name: 'Four Seasons Hotel George V',
				adress: 'Paris, George V Avenue 31',
				qualification: '8.6',
				img: './../../../../../assets/img/destination-paris/destination-paris-hotel-4.jpg',
				person: 1,
				price: 955004
			},
			{
				name: 'Le Bristol Paris',
				adress: 'Paris, Saint Honore Avenue 112',
				qualification: '8.1',
				img: './../../../../../assets/img/destination-paris/destination-paris-hotel-5.jpg',
				person: 1,
				price: 811754
			},
			{
				name: 'Le Meurice',
				adress: 'Paris, Rue de Rivoli 228',
				qualification: '7.8',
				img: './../../../../../assets/img/destination-paris/destination-paris-hotel-6.jpg',
				person: 1,
				price: 897177
			}]
		}
	];

	constructor(){	
    	this.cargarStorage();
  	}

	getDestinations(): Destination[] {
		return this.destinations;
	}

	getDestination(name:string): Destination | undefined {
		return this.destinations.find((destination) => destination.city === name);
	}

	shoppingCar(item: Hotel, person: number, dateArrived: Date, dateDeparted: Date): void {
		this.shoppingItem = item;

		this.shoppingItem.person = person;

		this.shoppingItem.date1 = dateArrived;

		this.shoppingItem.date2 = dateDeparted;

		if(this.shoppingItem !== undefined){
			this.shoppingItemsArr.push(this.shoppingItem);	
		}
		
		this.guardarStorage();
	}
	
	getShoppingItem(): Hotel[] {
		return this.shoppingItemsArr;
	}

	removeItem(index:number): Hotel[] {
		this.shoppingItemsArr.splice(index, 1);
		this.guardarStorage();
		return this.shoppingItemsArr;

	}

	guardarStorage(): void {
		localStorage.setItem('data', JSON.stringify(this.shoppingItemsArr));
	}

	cargarStorage(): void {
		if( localStorage.getItem('data') ){
			this.shoppingItemsArr = JSON.parse(localStorage.getItem('data') as string);
		}
	}

  	
}
