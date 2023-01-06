import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css'],
})
export class ThemeListComponent implements OnInit {
  posts!: [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.loadPosts$().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (error) => console.log(error),
    });
  }
}
