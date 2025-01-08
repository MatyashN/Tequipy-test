import { createReducer, on } from '@ngrx/store';
import * as employeesActions from './employees.actions';
import { adapter, EmployeesState } from './employees.state';

export const initialState: EmployeesState = adapter.getInitialState({
  selectedEmployeeId: null,
  isLoading: false,
  error: null,
});

export const employeeReducer = createReducer(
  initialState,
  on(employeesActions.loadEmployees, (state) => {
    return {...state, isLoading: state.ids.length !== 10, error: null}
  }),
  on(employeesActions.loadEmployeesSuccess, (state, {employees}) =>
    adapter.setAll(employees, {
      ...state,
      isLoading: false,
    })),
  on(employeesActions.loadEmployeesFailure, (state, {error}) => ({...state, isLoading: false, error})),

  on(employeesActions.setSelectedEmployeeId, (state, {id}) => ({
    ...state,
    selectedEmployeeId: id,
    isLoading: true,
  })),
  on(employeesActions.removeSelectedEmployeeId, (state) => ({
    ...state,
    selectedEmployeeId: null,
  })),
  on(employeesActions.addSelectedEmployee, (state, {employee}) =>
    adapter.upsertOne(employee, {
      ...state,
      isLoading: false,
      selectedEmployeeId: employee.id,
    })),

  on(employeesActions.offBoardEmployee, (state) => ({...state, isLoading: true})),

  on(employeesActions.updateEmployeeSuccess, (state, {employee}) => {
    return adapter.updateOne({id: employee.id, changes: employee}, {...state, isLoading: false});
  }),
);
