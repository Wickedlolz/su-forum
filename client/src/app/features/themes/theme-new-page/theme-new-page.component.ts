import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-theme-new-page',
  templateUrl: './theme-new-page.component.html',
  styleUrls: ['./theme-new-page.component.css'],
})
export class ThemeNewPageComponent {
  constructor(private router: Router, private themeService: ThemeService) {}

  handleAddNewTheme(newThemeForm: NgForm): void {
    console.log(newThemeForm.value);
    this.themeService.addTheme(newThemeForm.value).subscribe({
      next: (newTheme) => {
        this.router.navigate(['/themes']);
      },
      error: (error) => console.error(error),
    });
  }

  navigateToHome($event: MouseEvent): void {
    $event.preventDefault();
    this.router.navigate(['/home']);
  }
}
