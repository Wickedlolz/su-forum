import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [WelcomeComponent, LoaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [WelcomeComponent, LoaderComponent],
})
export class SharedModule {}
