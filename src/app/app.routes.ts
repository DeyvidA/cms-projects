import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import { TechnologiesComponent } from './pages/technologies/technologies.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'technologies',
    component: TechnologiesComponent,
    children: [
      {
        path: 'Create',
        loadChildren: () =>
          import('./pages/technologies/Create/Create.module').then(
            (m) => m.CreateModule
          ),
      },

      //   {
      //     path: 'edit/:id',
      //     loadChildren: () =>
      //       import('./pages/technologies/edit/edit.module').then(
      //         (m) => m.EditModule
      //       ),
      //   },
    ],
  },
];
