import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  /**
   * Validates that the control's value consists only of numeric characters.
   */
  static numericOnly(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined || value === '') {
        return null;
      }
      const isNumeric = /^\d+$/.test(String(value));
      return isNumeric ? null : { numericOnly: true, codNumber: true };
    };
  }

  /**
   * Validates that two fields in a FormGroup have matching values (e.g., email confirmation).
   */
  static matchFields(fieldName: string, matchingFieldName: string, errorKey = 'differentEmail'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control;
      const primaryControl = formGroup.get(fieldName);
      const matchingControl = formGroup.get(matchingFieldName);

      if (!primaryControl || !matchingControl) {
        return null;
      }

      if (matchingControl.errors && !matchingControl.errors[errorKey]) {
        return null;
      }

      if (primaryControl.value !== matchingControl.value) {
        matchingControl.setErrors({ ...matchingControl.errors, [errorKey]: true });
        return { [errorKey]: true };
      } else {
        if (matchingControl.errors) {
          const errors = { ...matchingControl.errors };
          delete errors[errorKey];
          matchingControl.setErrors(Object.keys(errors).length ? errors : null);
        }
        return null;
      }
    };
  }

  /**
   * Validates that the arrival date is before or equal to the departure date.
   */
  static dateOrder(arrivedFieldName: string, departedFieldName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const arrivedControl = control.get(arrivedFieldName);
      const departedControl = control.get(departedFieldName);

      if (!arrivedControl || !departedControl || !arrivedControl.value || !departedControl.value) {
        return null;
      }

      const arrived = new Date(arrivedControl.value).getTime();
      const departed = new Date(departedControl.value).getTime();

      if (arrived > departed) {
        return { invalidDateRange: true };
      }

      return null;
    };
  }
}
