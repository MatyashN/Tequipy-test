import { Equipment } from './equipment';
import { EmployeeStatuses } from './employee-statuses';

export interface Employee {
  id: string;
  name: string;
  department: string;
  email: string;
  status: EmployeeStatuses;
  equipments: Equipment[];
}
