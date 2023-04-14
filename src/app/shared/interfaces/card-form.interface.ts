import { FormControl } from "@angular/forms"

export interface DebitCardForm {
    bank: FormControl<string>;
    password: FormControl<string>;
};

export interface CreditCardform {
    creditCardNumber: FormControl<string>;
    creditCardMonth: FormControl<string>;
    creditCardYear: FormControl<string>;
    creditCardCode: FormControl<string>;
}