import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest, mergeMap, tap } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { PostService } from 'src/app/core/services/post.service';
import { ITheme } from 'src/app/core/interfaces/theme';
import { IPost, IPostDto } from 'src/app/core/interfaces/post';
import { IUser } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-theme-details-page',
  templateUrl: './theme-details-page.component.html',
  styleUrls: ['./theme-details-page.component.css'],
})
export class ThemeDetailsPageComponent implements OnInit, OnDestroy {
  theme!: ITheme<IPost, string | IUser>;
  subscription!: Subscription;
  isLoggedIn$ = this.authService.isLoggedIn$;
  isLoading: boolean = true;
  isPending: boolean = false;

  currentUser?: IUser;

  get canSubscribe() {
    return !this.theme.subscribers.includes(this.currentUser?._id || '');
  }

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.activatedRoute.params.pipe(
        tap(() => {
          this.isLoading = true;
        }),
        mergeMap((params) => {
          const themeId = params['themeId'];
          return this.themeService.loadThemeById$(themeId);
        })
      ),
      this.authService.currentUser$,
    ]).subscribe({
      next: ([theme, user]) => {
        this.theme = theme;
        this.currentUser = user;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleAddPost(postForm: NgForm): void {
    const themeId = this.activatedRoute.snapshot.params['themeId'];

    if (this.isPending) {
      return;
    }

    this.isPending = true;

    const body: IPostDto = {
      postText: postForm.value.postText as string,
    };

    this.themeService.addPost$(themeId, body).subscribe({
      next: (updatedTheme) => {
        this.theme = updatedTheme;
        postForm.resetForm();
        this.isPending = false;
      },
      error: (error) => {
        console.log(error);
        this.isPending = false;
      },
    });
  }

  canLike(comment: IPost) {
    return !comment.likes.includes(this.currentUser?._id || '');
  }

  handleLikeUnlike(postId: string): void {
    if (this.isPending) {
      return;
    }

    this.isPending = true;

    this.postService.handleLikeUnlike(postId).subscribe({
      next: (updatedPost) => {
        const postIndex = this.theme.posts.findIndex((p) => p._id === postId);

        this.theme.posts[postIndex] = updatedPost;
        this.isPending = false;
      },
      error: (error) => {
        console.log(error);
        this.isPending = false;
      },
    });
  }

  handleSubscribeUnsubscribe(themeId: string) {
    if (this.isPending) {
      return;
    }

    this.isPending = true;

    this.themeService.subscribe$(themeId).subscribe({
      next: (updatedTheme) => {
        this.theme = updatedTheme;
        this.isPending = false;
      },
      error: (error) => {
        console.log(error);
        this.isPending = false;
      },
    });
  }

  handleDeletePost(comment: IPost) {
    if (this.isPending) {
      return;
    }

    this.isPending = true;

    // this.postService.deletePost$().subscribe({})
  }
}
