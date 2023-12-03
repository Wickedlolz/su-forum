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
  currentUser$ = this.authService.currentUser$;
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(private authService: AuthService, private router: Router) {}

  handleLogout($event: MouseEvent): void {
    $event.preventDefault();
    this.authService.logout$().subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
