import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, EmployeesState } from './employees.state';

const selectEmployeeFeature = createFeatureSelector<EmployeesState>('employees');

export const {
  selectAll: selectAllEmployees,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors(selectEmployeeFeature);

export const selectEmployeesIsLoading = createSelector(
  selectEmployeeFeature,
  (state: EmployeesState) => state.isLoading
);
export const selectEmployeesLoadError = createSelector(
  selectEmployeeFeature,
  (state: EmployeesState) => state.error
);

export const selectEmployeeById = (id: string) => createSelector(selectEntities, (entities) => entities[id]);
