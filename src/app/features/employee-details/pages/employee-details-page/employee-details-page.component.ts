import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, InputSignal, resource } from '@angular/core';
import { EmployeeService } from '../../../../core/services/employee.service';
import { firstValueFrom, of, switchMap } from 'rxjs';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { DetailsComponent } from '../../components/details/details.component';
import { EquipmentsListComponent } from '../../components/equipments-list/equipments-list.component';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { OffboardFormComponent } from '../../components/offboard-form/offboard-form.component';
import { Employee } from '../../../../core/models/employee';
import { EmployeeStatuses } from '../../../../core/models/employee-statuses';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-details-page',
  imports: [
    PageHeaderComponent,
    DetailsComponent,
    EquipmentsListComponent,
    MatButton,
    MatAnchor,
    RouterLink,
  ],
  templateUrl: './employee-details-page.component.html',
  standalone: true,
  styleUrl: './employee-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsPageComponent {
  private readonly _employeeService: EmployeeService = inject(EmployeeService);
  private readonly _dialog = inject(MatDialog);
  private readonly _destroyRef = inject(DestroyRef);
  readonly statuses = EmployeeStatuses;

  id: InputSignal<string> = input.required();
  employeeDetails = resource({
    request: () => {
      return {id: this.id()};
    },
    loader: ({request}) => {
      return firstValueFrom(this._employeeService.getEmployeeById(request.id));
    }
  })

  offBoardHandler() {
    const dialogRef = this._dialog.open(OffboardFormComponent, {
      data: this.employeeDetails.value(),
    });

    const afterCloseSubscription = dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result) {
          return this._employeeService.offBoard(this.id(), result)
        } else {
          return of(result);
        }
      })
    ).subscribe({
      next: (data: Employee) => {
        if (data) {
          this.employeeDetails.set(data);
        }
      }
    })

    this._destroyRef.onDestroy(() => afterCloseSubscription.unsubscribe());
  }
}
