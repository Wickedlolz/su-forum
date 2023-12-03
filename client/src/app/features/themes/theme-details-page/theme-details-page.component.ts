import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map, switchMap, tap } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ITheme } from 'src/app/core/interfaces/theme';
import { IPost, IPostDto } from 'src/app/core/interfaces/post';
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
  isLoggedIn$ = this.authService.isLoggedIn$;

  currentUser$ = this.authService.currentUser$;

  get canSubscribe() {
    return this.currentUser$.pipe(
      map((user) => {
        return this.theme.subscribers.includes(user?._id || '');
      })
    );
    // return !this.theme.subscribers.includes(this.authService.user?._id || '');
  }

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private postService: PostService,
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

    const body: IPostDto = {
      postText: postForm.value.postText as string,
    };

    this.themeService.addPost$(themeId, body).subscribe({
      next: (updatedTheme) => {
        this.theme = updatedTheme;
        postForm.resetForm();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  canLike(comment: IPost): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user) => {
        return comment.likes.includes(user?._id || '');
      })
    );
    // return !comment.likes.includes(this.authService.user?._id || '');
  }

  handleLikeUnlike(postId: string): void {
    this.postService.handleLikeUnlike(postId).subscribe({
      next: (updatedPost) => {
        const postIndex = this.theme.posts.findIndex((p) => p._id === postId);

        this.theme.posts[postIndex] = updatedPost;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
