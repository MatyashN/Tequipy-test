import { ChangeDetectionStrategy, Component, output, OutputEmitterRef } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

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
  applyFilter: OutputEmitterRef<string> = output()

  keyupHandler(event: Event): void {
    this.applyFilter.emit((<HTMLInputElement>event.target).value);
  }
}
