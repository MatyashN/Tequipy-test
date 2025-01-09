import { createReducer, on } from '@ngrx/store';
import * as EmployeesActions from './employees.actions';
import { adapter, EmployeesState } from './employees.state';

export const initialState: EmployeesState = adapter.getInitialState({
  selectedEmployeeId: null,
  isLoading: false,
  error: null,
});

export const employeeReducer = createReducer(
  initialState,
  on(EmployeesActions.loadEmployees, (state) => {
    return {...state, isLoading: state.ids.length !== 10, error: null}
  }),
  on(EmployeesActions.loadEmployeesSuccess, (state, {employees}) =>
    adapter.setAll(employees, {
      ...state,
      isLoading: false,
    })),
  on(EmployeesActions.loadEmployeesFailure, (state, {error}) => ({...state, isLoading: false, error})),

  on(EmployeesActions.setSelectedEmployeeId, (state, {id}) => ({
    ...state,
    selectedEmployeeId: id,
    isLoading: true,
  })),
  on(EmployeesActions.removeSelectedEmployeeId, (state) => ({
    ...state,
    selectedEmployeeId: null,
  })),
  on(EmployeesActions.addSelectedEmployee, (state, {employee}) =>
    adapter.upsertOne(employee, {
      ...state,
      isLoading: false,
      selectedEmployeeId: employee.id,
    })),

  on(EmployeesActions.offBoardEmployee, (state) => ({...state, isLoading: true})),

  on(EmployeesActions.updateEmployeeSuccess, (state, {employee}) => {
    return adapter.updateOne({id: employee.id, changes: employee}, {...state, isLoading: false});
  }),
);
