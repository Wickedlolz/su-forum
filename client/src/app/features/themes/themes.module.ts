import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import { ThemeListComponent } from './theme-list/theme-list.component';
import { ThemeItemComponent } from './theme-item/theme-item.component';

@NgModule({
  declarations: [AsideComponent, ThemeListComponent, ThemeItemComponent],
  imports: [CommonModule],
  exports: [AsideComponent, ThemeListComponent],
})
export class ThemesModule {}
