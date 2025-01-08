import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  OutputEmitterRef
} from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

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
export class FilterPanelComponent implements OnInit {
  applyFilter: OutputEmitterRef<string> = output();
  keyUpEvents$: Subject<string> = new Subject();
  private readonly _destroyRef = inject(DestroyRef);

  keyupHandler(event: Event): void {
    this.keyUpEvents$.next((<HTMLInputElement>event.target).value);
  }

  ngOnInit() {
    const subscription = this.keyUpEvents$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe({
      next: (value) => this.applyFilter.emit(value),
    })

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
