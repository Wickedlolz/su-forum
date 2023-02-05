import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.authenticate().subscribe({
      next: (user) => {
        this.authService.user = user;
        this.authService.isLoggedIn = true;
      },
      error: (error) => console.error(error),
    });
  }
}
