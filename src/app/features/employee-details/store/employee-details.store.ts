import { Employee } from '../../../core/models/employee';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { EmployeeService } from '../../../core/services/employee.service';
import { inject } from '@angular/core';
import { firstValueFrom, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { OffBoardData } from '../../../core/models/off-board-data';
import { EmployeeStatuses } from '../../../core/models/employee-statuses';

type EmployeesState = {
  employee: Employee | null;
  loading: boolean;
}

const initialState: EmployeesState = {
  employee: null,
  loading: false,
}

export const EmployeeDetailsStore = signalStore(
  withState(initialState),
  withMethods((store, employeesService: EmployeeService = inject(EmployeeService)) => ({
    loadEmployee: rxMethod<string>(
      pipe(
        tap(() => patchState(store, {loading: true})),
        switchMap((id) => {
          return employeesService.getEmployeeById(id).pipe(
            tapResponse({
              next: (employee) => patchState(store, {employee}),
              error: console.error,
              finalize: () => patchState(store, {loading: false}),
            })
          )
        })
      )
    ),

    async offBoardEmployee(offBoardData: OffBoardData) {
      let prevEmployee: Employee | null = store.employee();

      if (!prevEmployee) {
        console.error('Employee not found');
        return;
      }

      // Below is an optimistic update: we update the data upfront, before receiving a response from the server. If an error occurs, we revert to the backup.
      patchState(store, {loading: true, employee: {...prevEmployee, status: EmployeeStatuses.OFF_BOARDED}});

      try {
        const res = await firstValueFrom(employeesService.offBoard(prevEmployee.id, offBoardData));
        patchState(store, {employee: res, loading: false});
      } catch (error) {
        console.error('Error offboarding employee:', error);
        patchState(store, {employee: prevEmployee, loading: false});
      }

    },

  }))
)
