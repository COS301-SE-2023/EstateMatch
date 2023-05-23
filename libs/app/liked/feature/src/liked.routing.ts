import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LikedPage } from './liked.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LikedPage
    },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LikedRouting {}