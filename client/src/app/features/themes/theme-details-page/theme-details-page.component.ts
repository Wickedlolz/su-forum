import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITheme } from 'src/app/core/interfaces/theme';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-theme-details-page',
  templateUrl: './theme-details-page.component.html',
  styleUrls: ['./theme-details-page.component.css'],
})
export class ThemeDetailsPageComponent implements OnInit {
  theme!: ITheme;
  isLoading: boolean = true;

  constructor(
    private themeService: ThemeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
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
}
