import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './features/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './features/pages/not-found-page/not-found-page.component';
import { ThemesPageComponent } from './features/themes/themes-page/themes-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'themes',
    loadChildren: () =>
      import('./features/themes/themes.module').then((m) => m.ThemesModule),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
