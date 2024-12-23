import { FormGroup } from '@angular/forms';

export function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : a > b ? 1 : 0) * (isAsc ? 1 : -1);
}

export function getFirstErrorMessage(form: FormGroup, controlName: string, errorMessages: {
  [key: string]: { [error: string]: string }
}): string | null {
  const control = form.get(controlName);
  if (control && control.errors) {
    const errors = control.errors;
    const fieldErrors = errorMessages[controlName];
    if (fieldErrors) {
      for (const errorKey in errors) {
        if (fieldErrors[errorKey]) {
          return fieldErrors[errorKey];
        }
      }
    }
  }
  return null;
}
