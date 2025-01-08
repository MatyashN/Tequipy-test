import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CORE_PROVIDERS } from './core/core.providers';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { EmployeesEffects } from './store/employees.effects';
import { employeeReducer } from './store/employees.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    ...CORE_PROVIDERS,
    provideStore(),
    provideState({name: 'employees', reducer: employeeReducer}),
    provideEffects(EmployeesEffects),
    provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()})
  ]
};
