import { ChangeDetectionStrategy, Component, computed, input, InputSignal, signal } from '@angular/core';
import { Employee } from '../../../../core/models/employee';
import { JoinNamesPipe } from '../../../../shared/pipes/join-names.pipe';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { compare } from '../../../../utils/helpers';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employees-table',
  imports: [
    MatTableModule, MatSortModule, JoinNamesPipe, RouterLink
  ],
  templateUrl: './table.component.html',
  standalone: true,
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  employees: InputSignal<Employee[]> = input.required();
  sort = signal<Sort | null>(null);
  dataSource = computed(() => {
    const employees = [...this.employees()];
    const sort = this.sort();

    if (!sort || !sort.active || sort.direction === '') return employees;

    employees.sort((a: Employee, b: Employee) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'department':
          return compare(a.department, b.department, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        default:
          return 0;
      }
    })

    return employees;
  })
  displayedColumns: string[] = ['name', 'email', 'department', 'equipments', 'status'];
}

