import { Component, OnInit } from '@angular/core';
import { ITheme } from 'src/app/core/interfaces/theme';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css'],
})
export class ThemeListComponent implements OnInit {
  themes!: ITheme[];

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.loadThemes$().subscribe({
      next: (themes) => {
        this.themes = themes;
      },
      error: (error) => console.error(error),
    });
  }
}
