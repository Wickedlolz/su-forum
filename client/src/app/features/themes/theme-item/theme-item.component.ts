import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ITheme } from 'src/app/core/interfaces/theme';
import { Observable, map, take } from 'rxjs';

@Component({
  selector: 'app-theme-item',
  templateUrl: './theme-item.component.html',
  styleUrls: ['./theme-item.component.css'],
})
export class ThemeItemComponent {
  @Input() theme!: ITheme;
  isLoggedIn$ = this.authService.isLoggedIn$;

  get canSubscribe(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      take(1),
      map((user) => {
        return !this.theme.subscribers.includes(user?._id || '');
      })
    );
  }

  constructor(private readonly authService: AuthService) {}
}
