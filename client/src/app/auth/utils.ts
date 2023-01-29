import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null;
  }

  if (!/.{6,}@(gmail|abv)\.(bg|com)/.test(value)) {
    return {
      email: true,
    };
  }
  return null;
}

export function passwordMatch(passwordFormControl: AbstractControl) {
  const validatorFn: ValidatorFn = (rePasswordFormControl: AbstractControl) => {
    if (passwordFormControl.value !== rePasswordFormControl.value) {
      return {
        passwordMissMatch: true,
      };
    }

    return null;
  };

  return validatorFn;
}
