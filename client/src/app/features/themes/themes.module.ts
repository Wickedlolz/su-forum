import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import { ThemeListComponent } from './theme-list/theme-list.component';
import { ThemeItemComponent } from './theme-item/theme-item.component';
import { ThemesPageComponent } from './themes-page/themes-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThemesRoutingModule } from './themes-routing.module';
import { ThemeDetailsPageComponent } from './theme-details-page/theme-details-page.component';

@NgModule({
  declarations: [
    AsideComponent,
    ThemeListComponent,
    ThemeItemComponent,
    ThemesPageComponent,
    ThemeDetailsPageComponent,
  ],
  imports: [CommonModule, ThemesRoutingModule, SharedModule],
  exports: [AsideComponent, ThemeListComponent],
})
export class ThemesModule {}
