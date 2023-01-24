import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NotFoundPageComponent, HomePageComponent],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class PagesModule {}
