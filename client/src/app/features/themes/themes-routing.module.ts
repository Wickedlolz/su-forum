import { RouterModule, Routes } from '@angular/router';
import { ThemeDetailsPageComponent } from './theme-details-page/theme-details-page.component';
import { ThemesPageComponent } from './themes-page/themes-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ThemesPageComponent,
  },
  {
    path: ':themeId',
    component: ThemeDetailsPageComponent,
  },
];

export const ThemesRoutingModule = RouterModule.forChild(routes);
