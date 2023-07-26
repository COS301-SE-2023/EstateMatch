import { Route } from '@angular/router';

export const appRoutes: Route[] = [  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/login/feature').then((m) => m.LoginModule),
  },
];
