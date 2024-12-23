import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OffboardFormComponent } from './offboard-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Employee } from '../../../../core/models/employee';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { getFirstErrorMessage } from '../../../../utils/helpers';
import { EmployeeStatuses } from '../../../../core/models/employee-statuses';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('OffboardFormComponent', () => {
  let component: OffboardFormComponent;
  let fixture: ComponentFixture<OffboardFormComponent>;

  const mockEmployee: Employee = {
    "id": "emp001",
    "name": "John Doe",
    "department": "Engineering",
    "status": EmployeeStatuses.ACTIVE,
    "email": "john.doe@company.com",
    "equipments": [
      {"id": "eq001", "name": "MacBook Pro"},
      {"id": "eq002", "name": "Magic Mouse"}
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
        BrowserAnimationsModule,
        OffboardFormComponent,
      ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: mockEmployee},
        {provide: MatDialogRef, useValue: {close: jasmine.createSpy('close')}},
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffboardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with the correct controls', () => {
    expect(component.form.contains('receiver')).toBeTrue();
    expect(component.form.contains('email')).toBeTrue();
    expect(component.form.contains('phone')).toBeTrue();
    expect(component.form.contains('streetLine')).toBeTrue();
    expect(component.form.contains('city')).toBeTrue();
    expect(component.form.contains('postalCode')).toBeTrue();
    expect(component.form.contains('country')).toBeTrue();
    expect(component.form.contains('notes')).toBeTrue();
  });


  it('should disable the Ok button when the form is invalid', () => {
    component.form.get('receiver')?.setValue('');
    component.form.get('email')?.setValue('');
    component.form.get('phone')?.setValue('');
    component.form.get('streetLine')?.setValue('');
    component.form.get('city')?.setValue('');
    component.form.get('postalCode')?.setValue('');
    component.form.get('country')?.setValue('');
    fixture.detectChanges();

    const okButton = fixture.nativeElement.querySelector('.offboard-form__ok-btn');

    expect(okButton.disabled).toBeTrue();
  });

  it('should enable the Ok button when the form is valid', () => {
    component.form.get('receiver')?.setValue('John');
    component.form.get('email')?.setValue('john.doe@example.com');
    component.form.get('phone')?.setValue('+1234567890');
    component.form.get('streetLine')?.setValue('123 Main St');
    component.form.get('city')?.setValue('New York');
    component.form.get('postalCode')?.setValue('12345');
    component.form.get('country')?.setValue('USA');
    fixture.detectChanges();

    const okButton = fixture.nativeElement.querySelector('.offboard-form__ok-btn');
    expect(okButton.disabled).toBeFalse();
  });

  it('should close the dialog when Cancel button is clicked', () => {
    const cancelButton = fixture.debugElement.query(By.css('button[mat-button]'));
    cancelButton.triggerEventHandler('click', null);
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should call getFirstErrorMessage correctly', () => {
    spyOn(component, 'getFirstErrorMessage').and.callThrough();
    component.getFirstErrorMessage(component.form, 'receiver');
    expect(component.getFirstErrorMessage).toHaveBeenCalled();
  });
});
