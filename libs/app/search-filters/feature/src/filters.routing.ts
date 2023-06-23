import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiltersPage } from './filters.page';
import { HomePage } from '@estate-match/app/home/feature';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: FiltersPage
    },
    {
      path: 'home',
      pathMatch: 'full',
      component: HomePage
  }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltersRouting {}