import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/core/services/post.service';
import { IPost } from 'src/app/core/interfaces/post';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit, OnDestroy {
  posts!: IPost[];
  isLoading: boolean = true;
  subscription!: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.postService.loadPosts$(5).subscribe({
      next: (posts) => {
        this.posts = posts;
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
}
