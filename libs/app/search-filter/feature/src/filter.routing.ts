import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPage } from '@estate-match/app/search/feature';
import { FilterPage } from './filter.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: FilterPage
    },
    {
      path: 'search',
      pathMatch: 'full',
      component: SearchPage
  }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterRouting {}