import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-themes-page',
  templateUrl: './themes-page.component.html',
  styleUrls: ['./themes-page.component.css'],
})
export class ThemesPageComponent {
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(private readonly authService: AuthService) {}
}
