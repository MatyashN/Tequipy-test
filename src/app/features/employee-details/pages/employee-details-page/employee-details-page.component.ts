import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, InputSignal, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { DetailsComponent } from '../../components/details/details.component';
import { EquipmentsListComponent } from '../../components/equipments-list/equipments-list.component';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeStatuses } from '../../../../core/models/employee-statuses';
import { RouterLink } from '@angular/router';
import { EmployeeDetailsStore } from '../../store/employee-details.store';
import { OffboardFormComponent } from '../../components/offboard-form/offboard-form.component';
import { of, switchMap } from 'rxjs';
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
  providers: [EmployeeDetailsStore],
})
export class EmployeeDetailsPageComponent implements OnInit {
  readonly store = inject(EmployeeDetailsStore);
  private readonly _dialog = inject(MatDialog);
  private readonly _destroyRef = inject(DestroyRef);
  readonly statuses = EmployeeStatuses;

  id: InputSignal<string> = input.required();

  ngOnInit() {
    this.store.loadEmployee(this.id);
  }

  offBoardHandler() {
    const dialogRef = this._dialog.open(OffboardFormComponent, {
      data: this.store.employee(),
    });

    const afterCloseSubscription = dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result) {
          return this.store.offBoardEmployee(result)
        } else {
          return of(result);
        }
      })
    ).subscribe()

    this._destroyRef.onDestroy(() => afterCloseSubscription.unsubscribe());
  }
}
