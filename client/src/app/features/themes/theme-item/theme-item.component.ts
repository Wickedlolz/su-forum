import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ITheme } from 'src/app/core/interfaces/theme';
import { Observable, map, take } from 'rxjs';
import { IPost } from 'src/app/core/interfaces/post';

@Component({
  selector: 'app-theme-item',
  templateUrl: './theme-item.component.html',
  styleUrls: ['./theme-item.component.css'],
})
export class ThemeItemComponent {
  @Input() theme!: ITheme;
  @Output() newUpdatedThemeEvent = new EventEmitter<ITheme<IPost>>();
  isLoggedIn$ = this.authService.isLoggedIn$;
  isPending: boolean = false;

  get canSubscribe(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      take(1),
      map((user) => {
        return !this.theme.subscribers.includes(user?._id || '');
      })
    );
  }

  constructor(
    private readonly authService: AuthService,
    private themeService: ThemeService
  ) {}

  handleSubscribeUnsubscribe(themeId: string) {
    if (this.isPending) {
      return;
    }

    this.isPending = true;

    this.themeService.subscribe$(themeId).subscribe({
      next: (updatedTheme) => {
        this.newUpdatedThemeEvent.emit(updatedTheme);
        this.isPending = false;
      },
      error: (error) => {
        console.log(error);
        this.isPending = false;
      },
    });
  }
}
