import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { Employee } from '../../../../core/models/employee';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { EmployeeStatuses } from '../../../../core/models/employee-statuses';

const employee: Employee = {
  id: '123',
  name: 'John Doe',
  department: 'Engineering',
  email: 'john.doe@example.com',
  status: EmployeeStatuses.ACTIVE,
  equipments: [
    {id: 'eq1', name: 'Laptop'},
    {id: 'eq2', name: 'Phone'},
  ],
};

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let componentRef: ComponentRef<DetailsComponent>;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('employee', employee);

    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display employee details', async () => {
    const fullName = fixture.debugElement.query(By.css('.details__full-name span:nth-child(2)')).nativeElement;
    const department = fixture.debugElement.query(By.css('.details__department span:nth-child(2)')).nativeElement;
    const email = fixture.debugElement.query(By.css('.details__email span:nth-child(2)')).nativeElement;

    expect(fullName.textContent).toContain('John Doe');
    expect(department.textContent).toContain('Engineering');
    expect(email.textContent).toContain('john.doe@example.com');
  });

});
