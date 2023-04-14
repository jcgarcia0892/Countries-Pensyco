import { FormControl } from "@angular/forms";

export interface DateForm {
    arrived: FormControl<Date>;
    departed: FormControl<Date>;
}