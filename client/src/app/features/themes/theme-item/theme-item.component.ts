import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ITheme } from 'src/app/core/interfaces/theme';
import { Observable, map } from 'rxjs';
import { IPost } from 'src/app/core/interfaces/post';

@Component({
  selector: 'app-theme-item',
  templateUrl: './theme-item.component.html',
  styleUrls: ['./theme-item.component.css'],
})
export class ThemeItemComponent implements OnChanges {
  @Input() theme!: ITheme;
  @Output() newUpdatedThemeEvent = new EventEmitter<ITheme<IPost>>();
  isLoggedIn$ = this.authService.isLoggedIn$;
  isPending: boolean = false;
  canSubscribe$!: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private themeService: ThemeService
  ) {}

  ngOnChanges(): void {
    this.canSubscribe$ = this.authService.currentUser$.pipe(
      map((currentUser) => {
        if (!currentUser || !this.theme) {
          return false;
        }

        return !this.theme.subscribers.includes(currentUser._id);
      })
    );
  }

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
