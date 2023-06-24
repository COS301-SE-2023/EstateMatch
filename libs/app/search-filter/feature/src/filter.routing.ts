import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from '@estate-match/app/home/feature';
import { FilterPage } from './filter.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: FilterPage
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
export class FilterRouting {}