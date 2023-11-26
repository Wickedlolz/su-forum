import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ITheme } from 'src/app/core/interfaces/theme';
import { IPost } from 'src/app/core/interfaces/post';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-theme-details-page',
  templateUrl: './theme-details-page.component.html',
  styleUrls: ['./theme-details-page.component.css'],
})
export class ThemeDetailsPageComponent implements OnInit, OnDestroy {
  theme!: ITheme<IPost>;
  isLoading: boolean = true;
  subscription!: Subscription;

  get canSubscribe() {
    return !this.theme.subscribers.includes(this.authService.user?._id || '');
  }

  get isLogged(): boolean {
    return this.authService.isLoggedIn;
  }

  constructor(
    private themeService: ThemeService,
    private postService: PostService,
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

  handlePost(postForm: NgForm): void {
    console.log(postForm.value);
  }

  canLike(comment: IPost): boolean {
    return !comment.likes.includes(this.authService.user?._id || '');
  }
}
