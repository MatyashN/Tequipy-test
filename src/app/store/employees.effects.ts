import { inject, Injectable } from '@angular/core';
import { EmployeeService } from '../core/services/employee.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of, switchMap, withLatestFrom } from 'rxjs';
import { selectAllEmployees } from './employees.selectors';
import { Store } from '@ngrx/store';
import { Employee } from '../core/models/employee';
import * as EmployeesActions from './employees.actions';

@Injectable()
export class EmployeesEffects {
  private actions$ = inject(Actions);
  private employeeService = inject(EmployeeService);
  private _store: Store = inject(Store);

  loadEmployees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeesActions.loadEmployees),
      withLatestFrom(this._store.select(selectAllEmployees)),
      exhaustMap(([action, employees]) => {
          if (employees.length !== 0 && employees.length >= 10) return EMPTY;

          return this.employeeService.getEmployees()
            .pipe(
              map(employees => EmployeesActions.loadEmployeesSuccess({employees})),
              catchError((error) => of(EmployeesActions.loadEmployeesFailure({error}))),
            );
        }
      )
    );
  });

  loadEmployeeById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeesActions.setSelectedEmployeeId),
      withLatestFrom(this._store.select(selectAllEmployees)),
      exhaustMap(([action, employees]) => {
          const employeeInStore = employees.find((e) => e.id === action.id);

          if (employeeInStore) return of(EmployeesActions.addSelectedEmployee({employee: employeeInStore}));

          return this.employeeService.getEmployeeById(action.id)
            .pipe(
              map(employee => EmployeesActions.addSelectedEmployee({employee})),
              catchError(error => of(EmployeesActions.loadEmployeesFailure({error}))),
            )
        }
      )
    );
  });

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.offBoardEmployee),
      switchMap(({id, offBoardData}) => {
        return this.employeeService.offBoard(id, offBoardData).pipe(
          map((updatedEmployee: Employee) => {
            return EmployeesActions.updateEmployeeSuccess({employee: updatedEmployee})
          }),
          catchError((error) =>
            of(EmployeesActions.updateEmployeeFailure({error}))
          )
        );
      })
    )
  );
}
