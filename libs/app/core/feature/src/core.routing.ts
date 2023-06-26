import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// const redirectLoggedOut = () => redirectUnauthorizedTo(['']);
// const redirectLoggedIn = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'preferences',
    loadChildren: () =>
      import('@estate-match/app/home/feature').then((m) => m.HomeModule),
  },
  {
    path: 'preferences',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/preferences/feature').then((m) => m.PreferencesModule),
  },
  {
    path: 'home',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/home/feature').then((m) => m.HomeModule),
  },
  {
    path: 'liked',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/liked/feature').then((m) => m.LikedModule),
  },
  {
    path: 'info',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/more-info/feature').then((m) => m.InfoModule),
  },
  {
    path: 'search',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/search/feature').then((m) => m.SearchModule),
  },
  {
    path: 'filter',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/search-filter/feature').then((m) => m.FilterModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class CoreRouting {}
