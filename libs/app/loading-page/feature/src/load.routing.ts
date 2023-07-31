import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadPage } from './load.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LoadPage
    } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadRouting {}