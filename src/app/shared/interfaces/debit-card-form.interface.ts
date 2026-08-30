import { FormControl } from '@angular/forms';

export interface DebitCardForm {
  bank: FormControl<string>;
  password: FormControl<string>;
}
