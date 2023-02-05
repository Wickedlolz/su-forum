import { Component } from '@angular/core';
import { IUser } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  get user(): IUser | null {
    return this.authService.user;
  }

  get isLogged(): boolean {
    return this.authService.isLoggedIn;
  }

  constructor(public authService: AuthService) {}

  handleLogout($event: MouseEvent): void {
    $event.preventDefault();
    this.authService.logout();
  }
}
