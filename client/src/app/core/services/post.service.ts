import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../interfaces/post';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

const endpoints = {
  posts: (limit?: number) => `/posts${limit ? '?limit=' + limit : ''}`,
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  loadPosts$(limit?: number): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${apiUrl}${endpoints.posts(limit)}`);
  }
}
