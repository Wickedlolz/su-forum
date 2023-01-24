import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/core/interfaces/post';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit {
  posts!: IPost[];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.loadPosts$().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (error) => console.error(error),
    });
  }
}
