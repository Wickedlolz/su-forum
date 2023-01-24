import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITheme } from 'src/app/core/interfaces/theme';
import { ThemeService } from 'src/app/core/services/theme.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-theme-details-page',
  templateUrl: './theme-details-page.component.html',
  styleUrls: ['./theme-details-page.component.css'],
})
export class ThemeDetailsPageComponent implements OnInit, OnDestroy {
  theme!: ITheme;
  isLoading: boolean = true;
  subscription!: Subscription;

  get isLogged(): boolean {
    return this.userService.isLoggedIn;
  }

  constructor(
    private themeService: ThemeService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.activatedRoute.params.subscribe((params) => {
      const themeId = params['themeId'];

      this.themeService.loadThemeById(themeId).subscribe({
        next: (theme) => {
          this.theme = theme;
          this.isLoading = false;
        },
        error: (error) => console.error(error),
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
