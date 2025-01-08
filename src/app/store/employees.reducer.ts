import { createReducer, on } from '@ngrx/store';
import * as Actions from './employees.actions';
import { adapter, EmployeesState } from './employees.state';

export const initialState: EmployeesState = adapter.getInitialState({
  selectedEmployeeId: null,
  isLoading: false,
  error: null,
});

export const employeeReducer = createReducer(
  initialState,
  on(Actions.loadEmployees, (state) => {
    return {...state, isLoading: state.ids.length !== 10, error: null}
  }),
  on(Actions.loadEmployeesSuccess, (state, {employees}) =>
    adapter.setAll(employees, {
      ...state,
      isLoading: false,
    })),
  on(Actions.loadEmployeesFailure, (state, {error}) => ({...state, isLoading: false, error})),

  on(Actions.setSelectedEmployeeId, (state, {id}) => ({
    ...state,
    selectedEmployeeId: id,
    isLoading: true,
  })),
  on(Actions.removeSelectedEmployeeId, (state) => ({
    ...state,
    selectedEmployeeId: null,
  })),
  on(Actions.addSelectedEmployee, (state, {employee}) =>
    adapter.upsertOne(employee, {
      ...state,
      isLoading: false,
      selectedEmployeeId: employee.id,
    })),

  on(Actions.offBoardEmployee, (state) => ({...state, isLoading: true})),

  on(Actions.updateEmployeeSuccess, (state, {employee}) => {
    return adapter.updateOne({id: employee.id, changes: employee}, {...state, isLoading: false});
  }),
);
