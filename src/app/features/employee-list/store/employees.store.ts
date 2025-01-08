import { Employee } from '../../../core/models/employee';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { EmployeeService } from '../../../core/services/employee.service';
import { inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, firstValueFrom, pipe, skip, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

type EmployeesState = {
  employees: Employee[];
  loading: boolean;
  filter: string
}

const initialState: EmployeesState = {
  employees: [],
  loading: false,
  filter: '',
}

export const EmployeesStore = signalStore(
  withState(initialState),
  withMethods((store, employeesService: EmployeeService = inject(EmployeeService)) => ({

    async loadAllEmployees() {
      patchState(store, {loading: true});
      const employees = await firstValueFrom(employeesService.getEmployees()) || [];
      patchState(store, {employees, loading: false});
    },

    updateFilter(query: string): void {
      patchState(store, {filter: query});
    },

    loadByQuery: rxMethod<string>(
      pipe(
        debounceTime(500),
        distinctUntilChanged(),
        skip(1),
        tap(() => patchState(store, {loading: true})),
        switchMap((query) => {
          return employeesService.getEmployees(query).pipe(
            tapResponse({
              next: (employees) => patchState(store, {employees}),
              error: console.error,
              finalize: () => patchState(store, {loading: false}),
            })
          )
        })
      )
    )

  }))
)
