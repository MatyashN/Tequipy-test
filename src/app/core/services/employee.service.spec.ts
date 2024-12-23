import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Employee } from '../models/employee';
import { EmployeeStatuses } from '../models/employee-statuses';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService],
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getEmployees', () => {
    it('should fetch employees from API and store them in cache', () => {
      const mockEmployees: Employee[] = [
        {
          "id": "emp001",
          "name": "John Doe",
          "department": "Engineering",
          "status": EmployeeStatuses.ACTIVE,
          "email": "john.doe@company.com",
          "equipments": [
            {"id": "eq001", "name": "MacBook Pro"},
            {"id": "eq002", "name": "Magic Mouse"}
          ]
        },
        {
          "id": "emp002",
          "name": "Jane Smith",
          "department": "Human Resources",
          "status": EmployeeStatuses.ACTIVE,
          "email": "jane.smith@company.com",
          "equipments": [
            {"id": "eq003", "name": "Dell XPS 13"},
            {"id": "eq004", "name": "Keyboard"}
          ]
        },
      ];

      service.getEmployees(true).subscribe((employees) => {
        expect(employees).toEqual(mockEmployees);
      });

      const req = httpMock.expectOne('/api/employees');
      expect(req.request.method).toBe('GET');
      req.flush(mockEmployees);
    });

    it('should return cached employees if not forced', () => {
      const mockEmployees: Employee[] = [
        {
          "id": "emp001",
          "name": "John Doe",
          "department": "Engineering",
          "status": EmployeeStatuses.ACTIVE,
          "email": "john.doe@company.com",
          "equipments": [
            {"id": "eq001", "name": "MacBook Pro"},
            {"id": "eq002", "name": "Magic Mouse"}
          ]
        },
        {
          "id": "emp002",
          "name": "Jane Smith",
          "department": "Human Resources",
          "status": EmployeeStatuses.ACTIVE,
          "email": "jane.smith@company.com",
          "equipments": [
            {"id": "eq003", "name": "Dell XPS 13"},
            {"id": "eq004", "name": "Keyboard"}
          ]
        },
      ];

      service.getEmployees().subscribe(() => {
        // Now fetch again without force
        service.getEmployees().subscribe((employees) => {
          expect(employees).toEqual(mockEmployees);
        });
      });

      const req = httpMock.expectOne('/api/employees');
      expect(req.request.method).toBe('GET');
      req.flush(mockEmployees);
    });
  });

  describe('getEmployeeById', () => {
    it('should fetch employee by id from API if not cached or forced', () => {
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

      service.getEmployeeById('emp001', true).subscribe((employee) => {
        expect(employee).toEqual(mockEmployee);
      });

      const req = httpMock.expectOne('/api/employees/emp001');
      expect(req.request.method).toBe('GET');
      req.flush(mockEmployee);
    });

  });

});
