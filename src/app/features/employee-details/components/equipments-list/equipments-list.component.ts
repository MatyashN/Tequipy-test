import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { Equipment } from '../../../../core/models/equipment';

@Component({
  selector: 'app-equipments-list',
  imports: [],
  templateUrl: './equipments-list.component.html',
  standalone: true,
  styleUrl: './equipments-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentsListComponent {
  equipments: InputSignal<Equipment[]> = input.required();
}
