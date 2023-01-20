import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ThemeDetailsPageComponent } from './theme-details-page/theme-details-page.component';
import { ThemeNewPageComponent } from './theme-new-page/theme-new-page.component';
import { ThemesPageComponent } from './themes-page/themes-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ThemesPageComponent,
  },
  {
    path: 'new',
    canActivate: [AuthGuard],
    component: ThemeNewPageComponent,
  },
  {
    path: ':themeId',
    component: ThemeDetailsPageComponent,
  },
];

export const ThemesRoutingModule = RouterModule.forChild(routes);
