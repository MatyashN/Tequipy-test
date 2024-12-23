import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { OffBoardData } from '../models/off-board-data';
import { EmployeeStatuses } from '../models/employee-statuses';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _http: HttpClient = inject(HttpClient);
  private _employees: WritableSignal<Employee[] | null> = signal<Employee[] | null>(null)

  public loadedEmployees: Signal<Employee[] | null> = this._employees.asReadonly();

  getEmployees(force: boolean = false): Observable<Employee[] | null> {
    if (force || !this.loadedEmployees()) {
      return this._http.get<Employee[]>('/api/employees').pipe(
        tap({
          next: (data: Employee[]) => {
            this._employees.set(data);
          }
        })
      );
    }
    return of(this.loadedEmployees());
  }

  getEmployeeById(id: string, force: boolean = false): Observable<Employee> {
    const employee: Employee | null = this._getEmployeeFromCache(id);
    if (!employee || force) {
      return this._http.get<Employee>(`/api/employees/${id}`);
    } else {
      return of(employee);
    }
  }

  offBoard(id: string, data: OffBoardData) {
    this._changeEmployee(id, {status: EmployeeStatuses.OFF_BOARDED});

    return this._http.post<Employee>(`/api/users/${id}/offboard`, data).pipe(
      catchError(e => {
        const employee = this._getEmployeeFromCache(id);
        if (employee) this._changeEmployee(id, {...employee});
        return throwError(() => new Error('Failed to store selected employee'))
      })
    )
  }

  private _getEmployeeFromCache(id: string): Employee | null {
    const loadedEmployees = this._employees();
    if (loadedEmployees === null) return null;
    return loadedEmployees.find(employee => employee.id === id) || null;
  }

  private _changeEmployee(id: string, data: Partial<Employee>): Employee | null {
    const loadedEmployees = this._employees();
    if (loadedEmployees === null) return null;
    const employeeIndex = loadedEmployees.findIndex(e => e.id === id);
    if (employeeIndex === -1) return null;
    const updatedEmployee: Employee = {...loadedEmployees[employeeIndex], ...data};
    loadedEmployees.splice(employeeIndex, 1, updatedEmployee);
    return updatedEmployee;
  }
}
