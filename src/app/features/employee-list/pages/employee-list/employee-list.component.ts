import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component';
import { Employee } from '../../../../core/models/employee';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import * as EmployeesActions from '../../../../store/employees.actions'
import { Store } from '@ngrx/store';
import {
  selectAllEmployees,
  selectEmployeesIsLoading,
  selectEmployeesLoadError
} from '../../../../store/employees.selectors';

@Component({
  selector: 'app-employee-list',
  imports: [
    TableComponent,
    FilterPanelComponent,
    PageHeaderComponent
  ],
  templateUrl: './employee-list.component.html',
  standalone: true,
  styleUrl: './employee-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent implements OnInit {
  private _store: Store = inject(Store);

  employeesFromStore = this._store.selectSignal(selectAllEmployees);
  isLoading = this._store.selectSignal(selectEmployeesIsLoading);
  error = this._store.selectSignal(selectEmployeesLoadError);
  filters = signal<string>('')
  employees = computed(() => {
    let filterQuery = this.filters();
    let employees: Employee[] = this.employeesFromStore() || [];

    return employees.filter(employee => {
      return employee.name.toLowerCase().indexOf(filterQuery.toLowerCase()) !== -1;
    });
  });

  ngOnInit() {
    this._store.dispatch(EmployeesActions.loadEmployees())
  }

}
