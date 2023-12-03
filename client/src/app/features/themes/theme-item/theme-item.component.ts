import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ITheme } from 'src/app/core/interfaces/theme';
import { Observable, map } from 'rxjs';

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
      map((user) => {
        return !this.theme.subscribers.includes(user?._id || '');
      })
    );
    // return !this.theme.subscribers.includes(this.authService.user!._id);
  }

  constructor(private readonly authService: AuthService) {}
}
