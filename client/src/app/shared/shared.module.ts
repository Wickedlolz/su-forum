import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { TimeAgoPipe } from './time-ago.pipe';

@NgModule({
  declarations: [WelcomeComponent, LoaderComponent, TimeAgoPipe],
  imports: [CommonModule, RouterModule],
  exports: [WelcomeComponent, LoaderComponent, TimeAgoPipe],
})
export class SharedModule {}
