import { NgModule } from '@angular/core';
import { HeroDetailComponent } from './hero-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HeroDetailComponent,
  },
];

@NgModule({
  imports: [HeroDetailComponent, RouterModule.forChild(routes)],
})
export class HeroDetailModule {}
