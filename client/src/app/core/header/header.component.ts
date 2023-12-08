import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageBusService } from '../services/message-bus.service';
import { Subscription } from 'rxjs';
import { MessageType } from '../interfaces/message';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser$ = this.authService.currentUser$;
  isLoggedIn$ = this.authService.isLoggedIn$;
  private subscription!: Subscription;
  message!: string;
  isMessageError!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageBus: MessageBusService
  ) {}

  ngOnInit(): void {
    this.subscription = this.messageBus.onNewMessage$.subscribe(
      (newMessage) => {
        this.message = newMessage?.text || '';
        this.isMessageError = newMessage?.type === MessageType.Error;

        if (this.message) {
          setTimeout(() => {
            this.messageBus.clear();
          }, 4000);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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
