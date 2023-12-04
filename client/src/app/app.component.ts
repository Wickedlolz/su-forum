import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { EMPTY, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  isLoading: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.authService.authenticate$().subscribe({
      complete: () => {
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
