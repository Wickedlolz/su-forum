import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUser } from '../interfaces/user';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}

  handleLogout($event: MouseEvent): void {
    $event.preventDefault();
    this.authService.logout$().subscribe({
      next: () => {
        this.authService.user = null;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
