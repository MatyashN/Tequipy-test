import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';
import { OffBoardData } from '../models/off-board-data';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _http: HttpClient = inject(HttpClient);

  getEmployees(): Observable<Employee[]> {
    return this._http.get<Employee[]>('/api/employees')
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this._http.get<Employee>(`/api/employees/${id}`);
  }

  offBoard(id: string, data: OffBoardData) {
    return this._http.post<Employee>(`/api/users/${id}/offboard`, data);
  }

}
