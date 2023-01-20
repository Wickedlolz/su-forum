import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  get isLogged(): boolean {
    return this.userService.isLoggedIn;
  }

  constructor(public userService: UserService) {}

  handleLogout($event: MouseEvent): void {
    $event.preventDefault();
    this.userService.logout();
  }
}
