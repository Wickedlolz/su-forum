import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ITheme } from 'src/app/core/interfaces/theme';
import { IPost } from 'src/app/core/interfaces/post';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-theme-details-page',
  templateUrl: './theme-details-page.component.html',
  styleUrls: ['./theme-details-page.component.css'],
})
export class ThemeDetailsPageComponent implements OnInit, OnDestroy {
  theme!: ITheme<IPost>;
  isLoading: boolean = true;
  subscription!: Subscription;

  get currentUser() {
    return this.authService.user;
  }

  get canSubscribe() {
    return !this.theme.subscribers.includes(this.authService.user?._id || '');
  }

  get isLogged(): boolean {
    return this.authService.isLoggedIn;
  }

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params
      .pipe(
        tap(() => {
          this.isLoading = true;
        }),
        switchMap((params) => {
          return this.themeService.loadThemeById$(params['themeId']);
        })
      )
      .subscribe({
        next: (theme) => {
          this.theme = theme;
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleAddPost(postForm: NgForm): void {
    const themeId = this.activatedRoute.snapshot.params['themeId'];

    this.themeService.addPost$(themeId, postForm.value).subscribe({
      next: (updatedTheme) => {
        this.theme = updatedTheme;
        postForm.resetForm();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  canLike(comment: IPost): boolean {
    return !comment.likes.includes(this.authService.user?._id || '');
  }
}
