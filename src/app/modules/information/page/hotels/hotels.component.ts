import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  minDateArrived:Date;
  minDateDepartured:Date;
  forma: FormGroup;
  showHotels:boolean;
  errors:boolean;
  person:number;
  dateArrived:string;
  dateDeparted:string;



 	 constructor(	private acRoute:ActivatedRoute,
  				      private CountriesService:PaisesService,
                private router:Router,
                private fb:FormBuilder) {
    
    this.errors = false;
    this.showHotels = false;
    this.schedule();
    this.minDateArrived = new Date();
    this.minDateDepartured = new Date();
    this.person = 1;
    

   }

  ngOnInit() {
   
    this.acRoute.params.subscribe( (data) =>{
      this.destination = this.CountriesService.getDestination(data['name']);
      
    });


  }


  addPerson(name:string){
    if(this.person < 51){
      return this.person++;
    }
  }

  sustPerson(name:string){

    if(this.person > 1){
      return this.person--;
    }
  }

  shoppingCar(hotel, person, dateArrived, dateDeparted){

    this.CountriesService.shoppingCar(hotel, person, dateArrived, dateDeparted);
    
  }

  /*-------forma-date --------------*/
   
  get arrivedInvalid(){
    return this.forma.get('arrived').invalid && this.forma.get('arrived').touched;
  }

  get departedInvalid(){
    return this.forma.get('departed').invalid && this.forma.get('departed').touched;
  }


  schedule(){
    this.forma = this.fb.group({
      arrived: ['',[Validators.required]],
      departed: ['', [Validators.required]]
    });
  }

  book(){
    
    Object.values(this.forma.controls).forEach(control => {
      return control.markAsTouched();
    })
    
    this.dateArrived = this.forma.controls['arrived'].value;
    this.dateDeparted = this.forma.controls['departed'].value;
    
    
    if(this.dateArrived > this.dateDeparted){
      this.showHotels = false;
      
      return this.errors = true;
    }
    
    if(this.forma.status === "VALID"){
      this.showHotels = true;
    }
  }

}

