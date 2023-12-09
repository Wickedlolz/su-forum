import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime, startWith, switchMap, tap } from 'rxjs';
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

  searchControl = new FormControl('');

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.subscription = this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        tap(() => {
          this.isLoading = true;
        }),
        switchMap((searchTearm) => this.themeService.loadThemes$(searchTearm!))
      )
      .subscribe((themes) => {
        this.themes = themes;
        this.isLoading = false;
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
