import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full',
  },
  {
    path: 'employees',
    loadChildren: () => import('./features/employee-list/employees-list.routes').then(m => m.EMPLOYEES_LIST_ROUTES),
  },
  {
    path: 'employees/:id',
    loadChildren: () => import('./features/employee-details/employee-details.routes').then(m => m.EMPLOYEE_DETAILS_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'employees',
  }
];
