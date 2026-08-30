import { FormControl } from "@angular/forms";

export interface DateForm {
    arrived: FormControl<Date | null>;
    departed: FormControl<Date | null>;
}