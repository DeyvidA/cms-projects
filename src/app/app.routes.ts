import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CreateComponent } from './pages/technologies/create/create.component';

import { TechnologiesComponent } from './pages/technologies/technologies.component';
import { ListComponent } from './pages/projects/list/list.component';
import { CreateComponent as ProjectCreateComponent } from './pages/projects/create/create.component';
import { EditComponent } from './pages/projects/edit/edit.component';

export const routes: Routes = [
  {
    path: 'technologies',
    children: [
      {
        path: '',
        component: TechnologiesComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'edit/:id',
        component: EditComponent,
      },
    ],
  },
  {
    path: 'projects',
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'create',
        component: ProjectCreateComponent,
      },
      {
        path: 'edit/:id',
        component: EditComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
