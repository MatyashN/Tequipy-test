import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { Employee } from '../../../../core/models/employee';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { getFirstErrorMessage } from '../../../../utils/helpers';
import { errorMessages } from './errors-messages';

@Component({
  selector: 'app-offboard-form',
  imports: [
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatButton,
    MatDialogTitle,
    ReactiveFormsModule,
    MatInput,
    MatLabel,
    MatError,
    MatDialogClose,
  ],
  templateUrl: './offboard-form.component.html',
  standalone: true,
  styleUrl: './offboard-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffboardFormComponent {
  readonly dialogRef = inject(MatDialogRef<OffboardFormComponent>);
  readonly data = inject<Employee>(MAT_DIALOG_DATA);

  form: FormGroup = new FormGroup({
    receiver: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Zа-яА-Я\s]+$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+?[0-9]{10,15}$/)
    ]),
    streetLine: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
      Validators.pattern(/^[a-zA-Zа-яА-Я0-9\s,.'-]+$/)
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Zа-яА-Я\s]+$/)
    ]),
    postalCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{5,10}$/)
    ]),
    country: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Zа-яА-Я\s]+$/)
    ]),
    notes: new FormControl('', [
      Validators.maxLength(200),
      Validators.pattern(/^[a-zA-Zа-яА-Я0-9\s,.'-]*$/)
    ])
  });

  getFirstErrorMessage(form: FormGroup, controlName: string) {
    return getFirstErrorMessage(form, controlName, errorMessages);
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

}
