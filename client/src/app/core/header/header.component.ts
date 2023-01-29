import { Component } from '@angular/core';
import { IUser } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  get user(): IUser | null {
    return this.userService.user;
  }

  get isLogged(): boolean {
    return this.userService.isLoggedIn;
  }

  constructor(public userService: UserService) {}

  handleLogout($event: MouseEvent): void {
    $event.preventDefault();
    this.userService.logout();
  }
}
