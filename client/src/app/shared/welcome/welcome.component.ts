import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  get isLogged(): boolean {
    return this.authService.isLoggedIn;
  }

  constructor(private authService: AuthService) {}
}
