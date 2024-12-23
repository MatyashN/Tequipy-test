import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { Employee } from '../../../../core/models/employee';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  standalone: true,
  styleUrl: './details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  employee: InputSignal<Employee> = input.required();
}
