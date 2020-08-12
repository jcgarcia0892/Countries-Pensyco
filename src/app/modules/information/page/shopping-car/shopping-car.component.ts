import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.css']
})
export class ShoppingCarComponent implements OnInit {
  forma:FormGroup;
  formaDebit:FormGroup;
  formaCredit:FormGroup;

  shoppingCarArr = [];

  constructor(  private countriesService:PaisesService,
                private fb:FormBuilder) {
    console.log(this.shoppingCarArr);
    this.shoppingCarArr = this.countriesService.shoppingList();
    this.createForm();
    this.createFormDebit();
    this.createFormCredit();

  }

  ngOnInit() {
  }

  removeItem(index:number){
    this.shoppingCarArr.splice(index, 1);
    this.countriesService.guardarStorage();
  }

  get nameInvalid(){
    return this.forma.get('name').invalid && this.forma.get('name').touched;
  }

  get lastNameInvalid(){
    return this.forma.get('lastName').invalid && this.forma.get('lastName').touched;
  }

  get paymentInvalid(){
    return this.forma.get('payment').invalid && this.forma.get('payment').touched;
  }
  
  get paymentDebit(){
    return this.forma.value.payment === 'debit';
  }

  get paymentCredit(){
    return this.forma.value.payment === 'credit';
  }

  /*---------- formulario de la tarjeta de debito ---------*/

  get bankInvalid(){
    return this.formaDebit.get('bank').invalid && this.formaDebit.get('bank').touched;
  }

  get passwordInvalid(){
    return this.formaDebit.get('password').invalid && this.formaDebit.get('password').touched;
  }


/*----------------------------------------------------------------*/

  createForm(){
    this.forma = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      email: ['',[Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      payment: ['', [Validators.required]]
    })
  }

  /*------------------ formulario de la tarjeta de debito -----------------------------*/

  createFormDebit(){
    this.formaDebit = this.fb.group({
      bank: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  /*--------------------------------------------------------------*/

  createFormCredit(){

  }


  sendInformation(){
    console.log(this.forma);
    console.log(this.forma.value.payment.length === 5);
    
    if(this.forma.invalid){
      return Object.values( this.forma.controls ).forEach(control => {
        control.markAsTouched();
      })
    }

    
  }

  validDebit(){
    console.log(this.formaDebit);
    if(this.formaDebit.invalid){
      return Object.values( this.formaDebit.controls ).forEach(control => {
        control.markAsTouched();
      })
    }
  }

  validCredit(){
    if(this.formaCredit.invalid){
      return Object.values( this.formaCredit.controls ).forEach(control => {
        control.markAsTouched();
      })
    }
  }




}
