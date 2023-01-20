import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  get isLogged(): boolean {
    return this.userService.isLoggedIn;
  }

  constructor(private userService: UserService) {}
}
