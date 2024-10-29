import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'heroes',
    loadComponent: () =>
      import('./heroes/components/hero-list/hero-list.component').then(
        (m) => m.HeroListComponent
      ),
  },
  {
    path: 'hero/:id',
    loadChildren: () =>
      import('./heroes/components/hero-detail/hero-detail.module').then(
        (m) => m.HeroDetailModule
      ),
  },
];
