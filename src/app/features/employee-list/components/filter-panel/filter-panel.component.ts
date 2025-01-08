import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { EmployeesStore } from '../../store/employees.store';

@Component({
  selector: 'app-filter-panel',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
  ],
  templateUrl: './filter-panel.component.html',
  standalone: true,
  styleUrl: './filter-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPanelComponent {
  readonly store = inject(EmployeesStore);

  keyupHandler(event: Event): void {
    this.store.updateFilter((<HTMLInputElement>event.target).value);
  }
}
