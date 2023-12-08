import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ITheme } from 'src/app/core/interfaces/theme';
import { IPost } from 'src/app/core/interfaces/post';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css'],
})
export class ThemeListComponent implements OnInit, OnDestroy {
  themes!: ITheme[];
  isLoading: boolean = true;
  subscription!: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.themeService.loadThemes$().subscribe({
      next: (themes) => {
        this.themes = themes;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleUpdateTheme(updatedTheme: ITheme<IPost>) {
    const themeIndex = this.themes.findIndex((t) => t._id === updatedTheme._id);

    if (themeIndex) {
      this.themes[themeIndex] = updatedTheme as unknown as ITheme;
    }
  }
}
