import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.css']
})
export class ShoppingCarComponent implements OnInit {
  forma!:UntypedFormGroup;
  formaDebit!:UntypedFormGroup;
  formaCredit!:UntypedFormGroup;
  debitValid!:boolean;
  creditValid!:boolean;
  totalPrice!:number;
  shoppingCarArr: any = [];
  thanks!:boolean;


  constructor(  private countriesService:PaisesService,
                private fb:UntypedFormBuilder,
                private router:Router) {


    this.totalPrice = 0;
    this.debitValid = false;
    this.creditValid = false;
    this.shoppingCarArr = this.countriesService.getShoppingItem();
    this.thanks = false;


    this.createForm();
    this.createFormDebit();
    this.createFormCredit();
    this.totalPriceFunction();

  }

  ngOnInit() {
  }

  totalPriceFunction(){
    
    this.totalPrice = 0;

    for(let item of this.shoppingCarArr){
      this.totalPrice += (item['person'] * item['price']);
      
    }
   
    return this.totalPrice;
  }

  removeItem(index:number){
    this.shoppingCarArr = this.countriesService.removeItem(index);
    this.totalPriceFunction();
  }

  get nameInvalid(){
    return this.forma.get('name')?.invalid && this.forma.get('name')?.touched;
  }

  get lastNameInvalid(){
    return this.forma.get('lastName')?.invalid && this.forma.get('lastName')?.touched;
  }

  get paymentInvalid(){
    return this.forma.get('payment')?.invalid && this.forma.get('payment')?.touched;
  }

  get emailInvalid(){
    return this.forma.get('email')?.invalid && this.forma.get('email')?.touched;
  }

  get confirmEmailInvalid(){
    return this.forma.get('confirmEmail')?.invalid && this.forma.get('confirmEmail')?.touched;
  }
  
  get paymentDebit(){
    return this.forma.value.payment === 'debit';
  }

  get paymentCredit(){
    return this.forma.value.payment === 'credit';
  }



  /*---------- formulario de la tarjeta de debito ---------*/

  get bankInvalid(){
    return this.formaDebit.get('bank')?.invalid && this.formaDebit.get('bank')?.touched;
  }

  get passwordInvalid(){
    return this.formaDebit.get('password')?.invalid && this.formaDebit.get('password')?.touched;
  }

    /*---------- formulario de la tarjeta de credito ---------*/

  get creditNumberInvalid(){
    return this.formaCredit.get('creditCardNumber')?.invalid && this.formaCredit.get('creditCardNumber')?.touched;
  }
  
  get creditMonthInvalid(){
    return this.formaCredit.get('creditCardMonth')?.invalid && this.formaCredit.get('creditCardMonth')?.touched;
  }

  get creditYearInvalid(){
    return this.formaCredit.get('creditCardYear')?.invalid && this.formaCredit.get('creditCardYear')?.touched;
  }

  get creditCodeInvalid(){
     return this.formaCredit.get('creditCardCode')?.invalid && this.formaCredit.get('creditCardCode')?.touched;
  }

/*----------------------------------------------------------------*/

  createForm(){
    this.forma = this.fb.group({
      name:         ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      lastName:     ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      email:        ['',[Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      payment:      ['', [Validators.required]]
    }, {
      validators: [this.sameEmail('email', 'confirmEmail')]
    });
  }

  /*------------------ formulario de la tarjeta de debito -----------------------------*/

  createFormDebit(){
    this.formaDebit = this.fb.group({
      bank:     ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), this.typeNumberFunction]]
    })
  }

  /*--------------------------------------------------------------*/

  createFormCredit(){
    this.formaCredit = this.fb.group({
      creditCardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), this.typeNumberFunction]],
      creditCardMonth:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2), this.typeNumberFunction]],
      creditCardYear:   ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2), this.typeNumberFunction]],
      creditCardCode:   ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), this.typeNumberFunction]]
    })
  }


  sendInformation(){
    console.log(this.forma);

    
    if(this.forma.invalid){
      Object.values( this.forma.controls ).forEach((control: AbstractControl) => {
        control.markAsTouched();
      })
    } 

    if(this.forma.status === 'VALID' && (this.formaCredit.status === 'VALID' || this.formaDebit.status === 'VALID')){
      this.thanks = true;
    }else{
      Object.values(this.formaCredit.controls).forEach((control: AbstractControl) => {
        control.markAsTouched();
      })

      Object.values(this.formaDebit.controls).forEach((control: AbstractControl) => {
        control.markAsTouched();
      })
    }
  }

  validDebit(){
    console.log(this.formaDebit);
    if(this.formaDebit.invalid){
      return Object.values( this.formaDebit.controls ).forEach((control: AbstractControl) => {
        control.markAsTouched();
      })
    }else{
      this.debitValid = true;

    }
  }

  validCredit(){
    if(this.formaCredit.invalid){

      return Object.values( this.formaCredit.controls ).forEach((control: AbstractControl) => {
        control.markAsTouched();
      })
    }else{
      this.creditValid = true;

    }
  }

  sameEmail(email: any, confirmEmail: any){
    return (formGroup: UntypedFormGroup)=> {
      const email1 = formGroup.controls['email']; 
      const email2 = formGroup.controls['confirmEmail'];

      if(email1.value === email2.value){
        email2.setErrors(null);
      }else{
        email2.setErrors({ differentEmail: true });
        
      }
    }
  }

  typeNumberFunction(control:UntypedFormControl):{[s:string]:boolean} | null{
    
    let codeNumber = control.value;
    

    if(isNaN(codeNumber)){
      return {
        codNumber:true
      };

    }

    return null;

  }

  emptyArr(){
    this.shoppingCarArr.length = 0;
  }


}
