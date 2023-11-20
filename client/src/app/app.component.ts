import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.authenticate().subscribe({
      next: (user) => {
        this.authService.user = user;
        this.authService.isLoggedIn = true;
      },
      error: (error) => console.error(error),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
