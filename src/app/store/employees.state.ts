import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Employee } from '../core/models/employee';

export interface EmployeesState extends EntityState<Employee> {
  selectedEmployeeId: string | null;
  isLoading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Employee> = createEntityAdapter<Employee>();
