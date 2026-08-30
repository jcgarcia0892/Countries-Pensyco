import { FormControl, FormGroup } from '@angular/forms';
import { CustomValidators } from './custom-validators';

describe('CustomValidators', () => {
  describe('numericOnly', () => {
    const validator = CustomValidators.numericOnly();

    it('should return null for valid numeric strings', () => {
      expect(validator(new FormControl('1234'))).toBeNull();
      expect(validator(new FormControl(''))).toBeNull();
      expect(validator(new FormControl(null))).toBeNull();
    });

    it('should return error for non-numeric characters', () => {
      expect(validator(new FormControl('12a4'))).toEqual({ numericOnly: true, codNumber: true });
      expect(validator(new FormControl('abc'))).toEqual({ numericOnly: true, codNumber: true });
    });
  });

  describe('matchFields', () => {
    it('should validate matching fields', () => {
      const form = new FormGroup({
        email: new FormControl('test@example.com'),
        confirmEmail: new FormControl('test@example.com')
      }, {
        validators: [CustomValidators.matchFields('email', 'confirmEmail')]
      });

      expect(form.valid).toBeTrue();
      expect(form.get('confirmEmail')?.errors).toBeNull();
    });

    it('should mark mismatched fields with error', () => {
      const form = new FormGroup({
        email: new FormControl('test@example.com'),
        confirmEmail: new FormControl('different@example.com')
      }, {
        validators: [CustomValidators.matchFields('email', 'confirmEmail')]
      });

      expect(form.valid).toBeFalse();
      expect(form.get('confirmEmail')?.hasError('differentEmail')).toBeTrue();
    });
  });

  describe('dateOrder', () => {
    it('should pass when arrived date is before departed date', () => {
      const form = new FormGroup({
        arrived: new FormControl(new Date('2026-09-01')),
        departed: new FormControl(new Date('2026-09-05'))
      }, {
        validators: [CustomValidators.dateOrder('arrived', 'departed')]
      });

      expect(form.hasError('invalidDateRange')).toBeFalse();
    });

    it('should fail when arrived date is after departed date', () => {
      const form = new FormGroup({
        arrived: new FormControl(new Date('2026-09-10')),
        departed: new FormControl(new Date('2026-09-05'))
      }, {
        validators: [CustomValidators.dateOrder('arrived', 'departed')]
      });

      expect(form.hasError('invalidDateRange')).toBeTrue();
    });
  });
});
