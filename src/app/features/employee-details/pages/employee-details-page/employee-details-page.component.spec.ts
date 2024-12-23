import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeDetailsPageComponent } from './employee-details-page.component';
import { EmployeeService } from '../../../../core/services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { Employee } from '../../../../core/models/employee';
import { OffboardFormComponent } from '../../components/offboard-form/offboard-form.component';
import { EmployeeStatuses } from '../../../../core/models/employee-statuses';
import { ComponentRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('EmployeeDetailsPageComponent', () => {
  let component: EmployeeDetailsPageComponent;
  let componentRef: ComponentRef<EmployeeDetailsPageComponent>;
  let fixture: ComponentFixture<EmployeeDetailsPageComponent>;
  let employeeService: jasmine.SpyObj<EmployeeService>;
  let matDialog: jasmine.SpyObj<MatDialog>;

  const mockEmployee: Employee = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    department: 'Engineering',
    status: EmployeeStatuses.ACTIVE,
    equipments: [],
  };

  beforeEach(async () => {
    const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getEmployeeById', 'offBoard']);
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, EmployeeDetailsPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {id: '1'} },
          },
        },
        {provide: EmployeeService, useValue: employeeServiceSpy},
        {provide: MatDialog, useValue: matDialogSpy},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsPageComponent);
    component = fixture.componentInstance;

    employeeService = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
    matDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

    componentRef.setInput('id', '1');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // describe('employeeDetails resource', () => {
  //   it('should fetch employee details successfully', async () => {
  //     employeeService.getEmployeeById.and.returnValue(of(mockEmployee));
  //
  //     await component.employeeDetails.load();
  //     expect(component.employeeDetails.value()).toEqual(mockEmployee);
  //     expect(employeeService.getEmployeeById).toHaveBeenCalledWith('1');
  //   });
  //
  //   it('should handle error while fetching employee details', async () => {
  //     const error = new Error('Failed to fetch employee details');
  //     employeeService.getEmployeeById.and.returnValue(throwError(() => error));
  //
  //     await expectAsync(component.employeeDetails.load()).toBeRejected();
  //     expect(component.employeeDetails.error()).toBe(error);
  //   });
  // });
  //
  // describe('offBoardHandler', () => {
  //   it('should open the dialog with employee details', () => {
  //     const dialogRefSpyObj = jasmine.createSpyObj({afterClosed: of(null)});
  //     matDialog.open.and.returnValue(dialogRefSpyObj);
  //
  //     component.employeeDetails.set(mockEmployee);
  //     component.offBoardHandler();
  //
  //     expect(matDialog.open).toHaveBeenCalledWith(OffboardFormComponent, {
  //       data: mockEmployee,
  //     });
  //   });
  //
  //   it('should call offBoard when dialog returns data', () => {
  //     const dialogRefSpyObj = jasmine.createSpyObj({afterClosed: of({receiver: 'Jane Doe'})});
  //     matDialog.open.and.returnValue(dialogRefSpyObj);
  //
  //     employeeService.offBoard.and.returnValue(of({...mockEmployee, status: EmployeeStatuses.OFF_BOARDED}));
  //
  //     component.employeeDetails.set(mockEmployee);
  //     component.offBoardHandler();
  //
  //     expect(employeeService.offBoard).toHaveBeenCalledWith('1', {receiver: 'Jane Doe'});
  //   });
  //
  //   it('should not call offBoard when dialog is closed without data', () => {
  //     const dialogRefSpyObj = jasmine.createSpyObj({afterClosed: of(null)});
  //     matDialog.open.and.returnValue(dialogRefSpyObj);
  //
  //     component.employeeDetails.set(mockEmployee);
  //     component.offBoardHandler();
  //
  //     expect(employeeService.offBoard).not.toHaveBeenCalled();
  //   });
  //
  //   it('should update employee details after successful offboarding', () => {
  //     const dialogRefSpyObj = jasmine.createSpyObj({afterClosed: of({receiver: 'Jane Doe'})});
  //     matDialog.open.and.returnValue(dialogRefSpyObj);
  //
  //     const updatedEmployee = {...mockEmployee, status: EmployeeStatuses.OFF_BOARDED};
  //     employeeService.offBoard.and.returnValue(of(updatedEmployee));
  //
  //     component.employeeDetails.set(mockEmployee);
  //     component.offBoardHandler();
  //
  //     expect(component.employeeDetails.value()).toEqual(updatedEmployee);
  //   });
  // });
});
