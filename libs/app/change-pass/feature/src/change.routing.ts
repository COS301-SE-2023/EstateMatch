import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePage } from './change.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ChangePage
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeRouting {}