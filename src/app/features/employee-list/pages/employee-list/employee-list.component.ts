import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { EmployeeService } from '../../../../core/services/employee.service';
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component';
import { Employee } from '../../../../core/models/employee';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

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

  private _destroyRef = inject(DestroyRef);
  private _employeeService: EmployeeService = inject(EmployeeService);

  filters = signal<string>('')
  employees = computed(() => {
    let filterQuery = this.filters();
    let employees: Employee[] = this._employeeService.loadedEmployees() || [];

    return employees.filter(employee => {
      return employee.name.toLowerCase().indexOf(filterQuery.toLowerCase()) !== -1;
    });
  });
  isFetching = signal<boolean>(false);
  error = signal<string>('');

  ngOnInit() {
    this.isFetching.set(true);

    const subscription = this._employeeService.getEmployees().subscribe({
      error: (e) => {
        this.error.set(e.message);
      },
      complete: () => {
        this.isFetching.set(false);
      }
    })

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

}
