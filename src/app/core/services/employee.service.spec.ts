import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee';
import { OffBoardData } from '../models/off-board-data';
import { EmployeeStatuses } from '../models/employee-statuses';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

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

  const offBoardData: OffBoardData = {
    receiver: 'testReceiver',
    email: 'test@test.com',
    phone: '+48777777777',
    streetLine: 'testStreetLine',
    city: 'testCity',
    postCode: '50000',
    country: 'testCountry',
    notes: 'notes'
  };

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getEmployees', () => {
    it('should fetch employees when force is true', () => {
      service.getEmployees(true).subscribe((employees) => {
        expect(employees).toEqual(mockEmployees);
      });

      const req = httpMock.expectOne('/api/employees');
      expect(req.request.method).toBe('GET');
      req.flush(mockEmployees);
    });

    it('should return cached employees when force is false and cache is available', () => {
      service.getEmployees(true).subscribe();
      httpMock.expectOne('/api/employees').flush(mockEmployees);

      service.getEmployees().subscribe((employees) => {
        expect(employees).toEqual(mockEmployees);
      });

      httpMock.expectNone('/api/employees');
    });
  });

  describe('#getEmployeeById', () => {
    it('should fetch employee by ID if not cached or force is true', () => {
      service.getEmployeeById('1', true).subscribe((employee) => {
        expect(employee).toEqual(mockEmployees[0]);
      });

      const req = httpMock.expectOne('/api/employees/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockEmployees[0]);
    });

    it('should return cached employee by ID if available and force is false', () => {
      service.getEmployees(true).subscribe();
      httpMock.expectOne('/api/employees').flush(mockEmployees);

      service.getEmployeeById('1').subscribe((employee) => {
        expect(employee).toEqual(mockEmployees[0]);
      });

      httpMock.expectNone('/api/employees/1');
    });
  });

  describe('#offBoard', () => {
    it('should update employee status and call the API', () => {
      service.getEmployees(true).subscribe();
      httpMock.expectOne('/api/employees').flush(mockEmployees);

      service.offBoard('1', offBoardData).subscribe((employee) => {
        expect(employee.status).toBe(EmployeeStatuses.OFF_BOARDED);
      });

      const req = httpMock.expectOne('/api/users/1/offboard');
      expect(req.request.method).toBe('POST');
      req.flush({ ...mockEmployees[0], status: EmployeeStatuses.OFF_BOARDED });
    });

    it('should revert status if API call fails', () => {
      service.getEmployees(true).subscribe();
      httpMock.expectOne('/api/employees').flush(mockEmployees);

      service.offBoard('1', offBoardData).subscribe({
        error: (error) => {
          expect(error.message).toBe('Failed to store selected employee');
        },
      });

      const req = httpMock.expectOne('/api/users/1/offboard');
      req.error(new ErrorEvent('Network Error'));

      const cachedEmployee = service['loadedEmployees']()?.find((e) => e.id === '1');
      expect(cachedEmployee?.status).toBe(EmployeeStatuses.ACTIVE);
    });
  });
});
