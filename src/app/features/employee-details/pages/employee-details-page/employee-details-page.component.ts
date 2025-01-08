import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  InputSignal,
  OnDestroy
} from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { DetailsComponent } from '../../components/details/details.component';
import { EquipmentsListComponent } from '../../components/equipments-list/equipments-list.component';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { OffboardFormComponent } from '../../components/offboard-form/offboard-form.component';
import { EmployeeStatuses } from '../../../../core/models/employee-statuses';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectEmployeeById, selectEmployeesIsLoading } from '../../../../store/employees.selectors';
import * as Actions from '../../../../store/employees.actions'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-employee-details-page',
  imports: [
    PageHeaderComponent,
    DetailsComponent,
    EquipmentsListComponent,
    MatButton,
    MatAnchor,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './employee-details-page.component.html',
  standalone: true,
  styleUrl: './employee-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsPageComponent implements OnDestroy {
  private readonly _dialog = inject(MatDialog);
  private readonly _destroyRef = inject(DestroyRef);
  readonly statuses = EmployeeStatuses;
  private _store: Store = inject(Store);
  readonly isLoading = this._store.selectSignal(selectEmployeesIsLoading);

  id: InputSignal<string> = input.required();

  employeeDetails = computed(() => {
    const employee = this._store.selectSignal(selectEmployeeById(this.id()))();
    if (!employee) {
      console.warn(`Employee with ID ${this.id()} not found.`);
    }
    return employee
  })

  constructor() {
    effect(() => {
      this._store.dispatch(Actions.setSelectedEmployeeId({id: this.id()}));
    });
  }

  ngOnDestroy() {
    this._store.dispatch(Actions.removeSelectedEmployeeId());
  }

  offBoardHandler() {
    const dialogRef = this._dialog.open(OffboardFormComponent, {
      data: this.employeeDetails(),
    });

    const afterCloseSubscription = dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          this._store.dispatch(Actions.offBoardEmployee({id: this.id(), offBoardData: result}))
        }
      }
    })

    this._destroyRef.onDestroy(() => afterCloseSubscription.unsubscribe());
  }
}
