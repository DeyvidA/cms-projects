import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CreateComponent } from './pages/technologies/create/create.component';

import { TechnologiesComponent } from './pages/technologies/technologies.component';
export const routes: Routes = [
  {
    path: 'technologies',
    component: TechnologiesComponent,
    children: [
      {
        path: 'new',
        component: CreateComponent,
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

  {
    path: 'new',
    component: CreateComponent,
  },

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
