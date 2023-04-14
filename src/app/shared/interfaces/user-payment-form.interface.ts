import { FormControl } from "@angular/forms"

export interface UserPaymentForm {
    name: FormControl<string>;
    lastName: FormControl<string>;
    email: FormControl<string>;
    confirmEmail: FormControl<string>;
    payment: FormControl<string>;
}