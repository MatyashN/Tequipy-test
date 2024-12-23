import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { Employee } from '../../../../core/models/employee';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { JoinNamesPipe } from '../../../../shared/pipes/join-names.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { EmployeeStatuses } from '../../../../core/models/employee-statuses';
import { ComponentRef } from '@angular/core';

describe('TableComponent', () => {
  let component: TableComponent;
  let componentRef: ComponentRef<TableComponent>;
  let fixture: ComponentFixture<TableComponent>;

  const mockEmployees: Employee[] = [
    {
      id: '1',
      name: 'Alice',
      email: 'alice@example.com',
      department: 'HR',
      status: EmployeeStatuses.ACTIVE,
      equipments: [{ id: 'e1', name: 'Laptop' }, { id: 'e2', name: 'Phone' }],
    },
    {
      id: '2',
      name: 'Bob',
      email: 'bob@example.com',
      department: 'Engineering',
      status: EmployeeStatuses.OFF_BOARDED,
      equipments: [{ id: 'e3', name: 'Desktop' }],
    },
    {
      id: '3',
      name: 'Charlie',
      email: 'charlie@example.com',
      department: 'Finance',
      status: EmployeeStatuses.ACTIVE,
      equipments: [],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TableComponent, // Import the standalone component
        MatTableModule,
        MatSortModule,
        JoinNamesPipe,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('employees', mockEmployees);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of rows', () => {
    const rows = fixture.debugElement.queryAll(By.css('mat-row'));
    expect(rows.length).toBe(mockEmployees.length);
  });

  it('should display employees in the table', () => {
    const firstRow = fixture.debugElement.query(By.css('mat-row')).nativeElement;
    expect(firstRow.textContent).toContain('Alice');
    expect(firstRow.textContent).toContain('alice@example.com');
    expect(firstRow.textContent).toContain('HR');
    expect(firstRow.textContent).toContain('ACTIVE');
  });

  describe('Sorting', () => {
    it('should sort by name in ascending order', () => {
      const sort: Sort = { active: 'name', direction: 'asc' };
      component.sort.set(sort);
      fixture.detectChanges();

      const sortedEmployees = component.dataSource();
      expect(sortedEmployees[0].name).toBe('Alice');
      expect(sortedEmployees[1].name).toBe('Bob');
      expect(sortedEmployees[2].name).toBe('Charlie');
    });

    it('should sort by name in descending order', () => {
      const sort: Sort = { active: 'name', direction: 'desc' };
      component.sort.set(sort);
      fixture.detectChanges();

      const sortedEmployees = component.dataSource();
      expect(sortedEmployees[0].name).toBe('Charlie');
      expect(sortedEmployees[1].name).toBe('Bob');
      expect(sortedEmployees[2].name).toBe('Alice');
    });

    it('should sort by department in ascending order', () => {
      const sort: Sort = { active: 'department', direction: 'asc' };
      component.sort.set(sort);
      fixture.detectChanges();

      const sortedEmployees = component.dataSource();
      expect(sortedEmployees[0].department).toBe('Engineering');
      expect(sortedEmployees[1].department).toBe('Finance');
      expect(sortedEmployees[2].department).toBe('HR');
    });

    it('should sort by status in descending order', () => {
      const sort: Sort = { active: 'status', direction: 'desc' };
      component.sort.set(sort);
      fixture.detectChanges();

      const sortedEmployees = component.dataSource();
      expect(sortedEmployees[0].status).toBe(EmployeeStatuses.OFF_BOARDED);
      expect(sortedEmployees[1].status).toBe(EmployeeStatuses.ACTIVE);
      expect(sortedEmployees[2].status).toBe(EmployeeStatuses.ACTIVE);
    });

    it('should not sort when direction is empty', () => {
      const sort: Sort = { active: 'name', direction: '' };
      component.sort.set(sort);
      fixture.detectChanges();

      const sortedEmployees = component.dataSource();
      expect(sortedEmployees).toEqual(mockEmployees);
    });
  });
});
