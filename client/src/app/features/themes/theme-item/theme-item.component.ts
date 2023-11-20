import { Component, Input } from '@angular/core';
import { ITheme } from 'src/app/core/interfaces/theme';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-theme-item',
  templateUrl: './theme-item.component.html',
  styleUrls: ['./theme-item.component.css'],
})
export class ThemeItemComponent {
  @Input() theme!: ITheme;

  get canSubscribe(): boolean | undefined {
    return !this.theme.subscribers.includes(this.authService.user!._id);
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  constructor(private readonly authService: AuthService) {}
}
