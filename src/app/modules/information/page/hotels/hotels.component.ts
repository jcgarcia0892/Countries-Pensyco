import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaisesService } from './../../../../services/paises.service';
import { AbstractControl } from '@angular/forms';




@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  country!:any;
  destination:any = {};
  minDateArrived!:Date;
  minDateDepartured!:Date;
  forma!: UntypedFormGroup;
  showHotels!:boolean;
  errors!:boolean;
  person!:number;
  dateArrived!:string;
  dateDeparted!:string;



 	 constructor(	private acRoute:ActivatedRoute,
  				      private CountriesService:PaisesService,
                private router:Router,
                private fb:UntypedFormBuilder) {
    
    this.errors = false;
    this.showHotels = false;
    this.schedule();
    this.minDateArrived = new Date();
    this.minDateDepartured = new Date();
    this.person = 1;
    

   }

  ngOnInit() {
   
    this.acRoute.params.subscribe( (data: any) =>{
      this.destination = this.CountriesService.getDestination(data['name']);
      
    });


  }


  addPerson(): any{
    if(this.person < 51){
      return this.person++;
    }
  }

  sustPerson(): any{

    if(this.person > 1){
      return this.person--;
    }
  }

  shoppingCar(hotel: any, person: any, dateArrived: any, dateDeparted: any){

    this.CountriesService.shoppingCar(hotel, person, dateArrived, dateDeparted);
    
  }

  /*-------forma-date --------------*/
   
  get arrivedInvalid(){
    return this.forma.get('arrived')?.invalid && this.forma.get('arrived')?.touched;
  }

  get departedInvalid(){
    return this.forma.get('departed')?.invalid && this.forma.get('departed')?.touched;
  }


  schedule(){
    this.forma = this.fb.group({
      arrived: ['',[Validators.required]],
      departed: ['', [Validators.required]]
    });
  }

  book(): any{
    
    Object.values(this.forma.controls).forEach((control: AbstractControl) => {
      return control.markAsTouched();
    });
    
    this.dateArrived = this.forma.controls['arrived'].value;
    this.dateDeparted = this.forma.controls['departed'].value;
    
    
    if(this.dateArrived > this.dateDeparted){
      this.showHotels = false;
      
      return this.errors = true;
    }
    
    if(this.forma.status === "VALID"){
      this.errors = false;
      this.showHotels = true;
    }
  }

}

