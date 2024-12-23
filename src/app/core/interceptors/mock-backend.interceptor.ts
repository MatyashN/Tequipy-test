import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of, tap } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeeStatuses } from '../models/employee-statuses';

export const mockBackendInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.endsWith('/api/employees') && req.method === 'GET') {
    const response = new HttpResponse({status: 200, body: usersListMock});

    return of(response).pipe(
      delay(500),
      tap(() => console.log('/api/employees'))
    );
  }

  const employeeIdMatch = req.url.match(/\/api\/employees\/([a-zA-Z0-9_-]+)$/);

  if (employeeIdMatch && req.method === 'GET') {
    const employeeId = employeeIdMatch[1];
    const employee: Employee | undefined = usersListMock.find((_employee: Employee) => _employee.id === employeeId);
    if (employee) {
      return of(new HttpResponse({status: 200, body: employee})).pipe(
        delay(500),
        tap(() => console.log(`/api/employees/${employeeId}`)),
      );
    } else {
      return of(new HttpResponse({status: 404, body: {result: 'Employee Not Found'}}));
    }
  }

  const offBoardEmployeeIdMatch = req.url.match(/\/api\/users\/([a-zA-Z0-9_-]+)\/offboard$/);

  if (offBoardEmployeeIdMatch && req.method === 'POST') {
    const employeeId = offBoardEmployeeIdMatch[1];
    const employeeIndex = usersListMock.findIndex((_employee: Employee) => _employee.id === employeeId);
    if (employeeIndex !== -1) {
      const employee = usersListMock[employeeIndex];
      employee.status = EmployeeStatuses.OFF_BOARDED;
      return of(new HttpResponse({status: 200, body: {...employee}})).pipe(
        delay(500),
        tap(() => console.log(`/api/users/${employeeId}/offboard`)),
      );
    } else {
      return of(new HttpResponse({status: 404, body: {result: 'Employee Not Found'}}));
    }
  }

  return of(new HttpResponse({status: 404, body: {result: 'You are using the wrong endpoint'}}));
};


const usersListMock: Employee[] = [
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
  {
    "id": "emp003",
    "name": "Robert Johnson",
    "department": "Finance",
    "status": EmployeeStatuses.ACTIVE,
    "email": "robert.johnson@company.com",
    "equipments": [
      {"id": "eq005", "name": "Lenovo ThinkPad"},
      {"id": "eq006", "name": "Mouse"}
    ]
  },
  {
    "id": "emp004",
    "name": "Emily Davis",
    "department": "Marketing",
    "status": EmployeeStatuses.ACTIVE,
    "email": "emily.davis@company.com",
    "equipments": [
      {"id": "eq007", "name": "iMac"},
      {"id": "eq008", "name": "Trackpad"}
    ]
  },
  {
    "id": "emp005",
    "name": "Michael Brown",
    "department": "Engineering",
    "status": EmployeeStatuses.ACTIVE,
    "email": "michael.brown@company.com",
    "equipments": [
      {"id": "eq009", "name": "MacBook Air"},
      {"id": "eq010", "name": "Headset"}
    ]
  },
  {
    "id": "emp006",
    "name": "Sarah Wilson",
    "department": "Product",
    "status": EmployeeStatuses.ACTIVE,
    "email": "sarah.wilson@company.com",
    "equipments": [
      {"id": "eq011", "name": "Surface Pro"},
      {"id": "eq012", "name": "Pen"}
    ]
  },
  {
    "id": "emp007",
    "name": "David Lee",
    "department": "Support",
    "status": EmployeeStatuses.ACTIVE,
    "email": "david.lee@company.com",
    "equipments": [
      {"id": "eq013", "name": "HP Laptop"},
      {"id": "eq014", "name": "Monitor"}
    ]
  },
  {
    "id": "emp008",
    "name": "Laura Martinez",
    "department": "Operations",
    "status": EmployeeStatuses.ACTIVE,
    "email": "laura.martinez@company.com",
    "equipments": [
      {"id": "eq015", "name": "Chromebook"},
      {"id": "eq016", "name": "Mouse"}
    ]
  },
  {
    "id": "emp009",
    "name": "James Taylor",
    "department": "Engineering",
    "status": EmployeeStatuses.ACTIVE,
    "email": "james.taylor@company.com",
    "equipments": [
      {"id": "eq017", "name": "Mac Mini"},
      {"id": "eq018", "name": "Keyboard"}
    ]
  },
  {
    "id": "emp010",
    "name": "Sophia Moore",
    "department": "Design",
    "status": EmployeeStatuses.ACTIVE,
    "email": "sophia.moore@company.com",
    "equipments": [
      {"id": "eq019", "name": "iPad Pro"},
      {"id": "eq020", "name": "Apple Pencil"}
    ]
  }
]
