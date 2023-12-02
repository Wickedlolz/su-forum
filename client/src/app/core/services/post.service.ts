import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../interfaces/post';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

const endpoints = {
  posts: (limit?: number) => `/posts${limit ? '?limit=' + limit : ''}`,
  like: (postId: string) => `/likes/${postId}`,
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  loadPosts$(limit?: number): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(`${apiUrl}${endpoints.posts(limit)}`);
  }

  handleLikeUnlike(postId: string): Observable<IPost> {
    return this.httpClient.put<IPost>(
      `${apiUrl}${endpoints.like(postId)}`,
      {},
      { withCredentials: true }
    );
  }
}
