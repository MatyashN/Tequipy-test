import { createAction, props } from '@ngrx/store';
import { Employee } from '../core/models/employee';
import { OffBoardData } from '../core/models/off-board-data';

export const employeesActionList = {
  loadEmployees: '[Employees] start load employees',
  loadEmployeesSuccess: '[Employees] load employees success',
  loadEmployeesFailure: '[Employees] load employees failure',

  setSelectedEmployeeId: '[Employees] set selected employee id',
  addSelectedEmployee: '[Employees] add selected employee',
  removeSelectedEmployeeId: '[Employees] remove selected employee id',

  offBoardEmployee: '[Employees] offBoard employee',

  updateEmployee: '[Employee] Update Employee',
  updateEmployeeSuccess: '[Employee] Update Employee Success',
  updateEmployeeFailure: '[Employee] Update Employee Failure',
}

export const loadEmployees = createAction(employeesActionList.loadEmployees, props<{ force: boolean }>);
export const loadEmployeesSuccess = createAction(employeesActionList.loadEmployeesSuccess, props<{
  employees: Employee[]
}>());
export const loadEmployeesFailure = createAction(employeesActionList.loadEmployeesFailure, props<{
  error: any
}>());

export const setSelectedEmployeeId = createAction(employeesActionList.setSelectedEmployeeId, props<{
  id: string
}>());
export const removeSelectedEmployeeId = createAction(employeesActionList.removeSelectedEmployeeId);

export const addSelectedEmployee = createAction(employeesActionList.addSelectedEmployee, props<{
  employee: Employee
}>());

export const updateEmployee = createAction(employeesActionList.updateEmployee, props<{ employee: string }>());
export const updateEmployeeSuccess = createAction(employeesActionList.updateEmployeeSuccess, props<{
  employee: Employee
}>());
export const updateEmployeeFailure = createAction(employeesActionList.loadEmployeesFailure, props<{ error: any }>());

export const offBoardEmployee = createAction(employeesActionList.offBoardEmployee, props<{id: string, offBoardData: OffBoardData }>());
