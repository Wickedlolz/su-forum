import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  loadPosts$(): Observable<IPost[]> {
    return this.http.get<IPost[]>('http://localhost:5000/api/v1/posts?limit=5');
  }
}
