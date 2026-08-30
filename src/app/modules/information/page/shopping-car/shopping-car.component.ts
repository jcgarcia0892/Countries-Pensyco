import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/shared/interfaces/cart-item.interface';
import { CreditCardForm } from 'src/app/shared/interfaces/credit-card-form.interface';
import { DebitCardForm } from 'src/app/shared/interfaces/debit-card-form.interface';
import { UserPaymentForm } from 'src/app/shared/interfaces/user-payment-form.interface';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.scss'],
  standalone: false
})
export class ShoppingCarComponent implements OnInit, OnDestroy {
  forma!: FormGroup<UserPaymentForm>;
  formaDebit!: FormGroup<DebitCardForm>;
  formaCredit!: FormGroup<CreditCardForm>;

  debitValid = false;
  creditValid = false;
  totalPrice = 0;
  shoppingCarArr: CartItem[] = [];
  showThanks = false;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly cartService: CartService) {}

  ngOnInit(): void {
    this.createForms();

    this.cartService.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe((items) => {
        this.shoppingCarArr = items;
      });

    this.cartService.totalPrice$
      .pipe(takeUntil(this.destroy$))
      .subscribe((total) => {
        this.totalPrice = total;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  totalPriceFunction(): number {
    return this.totalPrice;
  }

  removeItem(index: number): void {
    this.cartService.removeItem(index);
  }

  emptyArr(): void {
    this.cartService.clear();
  }

  // --- Field Validation Helpers ---
  get nameInvalid(): boolean {
    const ctrl = this.forma.controls.name;
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  get lastNameInvalid(): boolean {
    const ctrl = this.forma.controls.lastName;
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  get paymentInvalid(): boolean {
    const ctrl = this.forma.controls.payment;
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  get emailInvalid(): boolean {
    const ctrl = this.forma.controls.email;
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  get confirmEmailInvalid(): boolean {
    const ctrl = this.forma.controls.confirmEmail;
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  get paymentDebit(): boolean {
    return this.forma.controls.payment.value === 'debit';
  }

  get paymentCredit(): boolean {
    return this.forma.controls.payment.value === 'credit';
  }

  get bankInvalid(): boolean {
    const ctrl = this.formaDebit.controls.bank;
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  get passwordInvalid(): boolean {
    const ctrl = this.formaDebit.controls.password;
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  get creditNumberInvalid(): boolean {
    const ctrl = this.formaCredit.controls.creditCardNumber;
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  get creditMonthInvalid(): boolean {
    const ctrl = this.formaCredit.controls.creditCardMonth;
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  get creditYearInvalid(): boolean {
    const ctrl = this.formaCredit.controls.creditCardYear;
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  get creditCodeInvalid(): boolean {
    const ctrl = this.formaCredit.controls.creditCardCode;
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  // --- Form Initialization ---
  private createForms(): void {
    this.forma = new FormGroup<UserPaymentForm>({
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      }),
      lastName: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      }),
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      }),
      confirmEmail: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      }),
      payment: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      })
    }, {
      validators: [CustomValidators.matchFields('email', 'confirmEmail')]
    });

    this.formaDebit = new FormGroup<DebitCardForm>({
      bank: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      password: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          CustomValidators.numericOnly()
        ]
      })
    });

    this.formaCredit = new FormGroup<CreditCardForm>({
      creditCardNumber: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
          CustomValidators.numericOnly()
        ]
      }),
      creditCardMonth: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
          CustomValidators.numericOnly()
        ]
      }),
      creditCardYear: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
          CustomValidators.numericOnly()
        ]
      }),
      creditCardCode: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(3),
          CustomValidators.numericOnly()
        ]
      })
    });
  }

  sendInformation(): void {
    if (this.forma.invalid) {
      this.forma.markAllAsTouched();
      return;
    }

    const isDebitSelected = this.paymentDebit;
    const isCreditSelected = this.paymentCredit;

    if (isDebitSelected && this.formaDebit.invalid) {
      this.formaDebit.markAllAsTouched();
      return;
    }

    if (isCreditSelected && this.formaCredit.invalid) {
      this.formaCredit.markAllAsTouched();
      return;
    }

    const isPaymentMethodValid =
      (isDebitSelected && this.formaDebit.valid) ||
      (isCreditSelected && this.formaCredit.valid);

    if (this.forma.valid && isPaymentMethodValid) {
      this.showThanks = true;
    }
  }

  validDebit(): void {
    if (this.formaDebit.invalid) {
      this.formaDebit.markAllAsTouched();
      return;
    }
    this.debitValid = true;
  }

  validCredit(): void {
    if (this.formaCredit.invalid) {
      this.formaCredit.markAllAsTouched();
      return;
    }
    this.creditValid = true;
  }
}
