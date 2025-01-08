import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { EmployeesStore } from '../../store/employees.store';

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
  providers: [EmployeesStore],
})
export class EmployeeListComponent implements OnInit {
  readonly store = inject(EmployeesStore);

  ngOnInit() {
    this._startInitialLogic();
  }

  private _startInitialLogic() {
    const query = this.store.filter;

    this.store.loadAllEmployees().then(() => {
      this.store.loadByQuery(query);
    })
  }

}
