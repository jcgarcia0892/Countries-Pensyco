import { FormControl } from '@angular/forms';

export interface CreditCardForm {
  creditCardNumber: FormControl<string>;
  creditCardMonth: FormControl<string>;
  creditCardYear: FormControl<string>;
  creditCardCode: FormControl<string>;
}

// Backwards compatibility alias
export type CreditCardform = CreditCardForm;
