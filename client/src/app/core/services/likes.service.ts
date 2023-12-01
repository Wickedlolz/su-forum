import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPost } from '../interfaces/post';

const apiUrl = environment.apiUrl;

const endpoints = {
  like: (postId: string) => `/likes/${postId}`,
};

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  constructor(private httpClient: HttpClient) {}

  handleLikeUnlike(postId: string): Observable<IPost> {
    return this.httpClient.put<IPost>(
      `${apiUrl}${endpoints.like(postId)}`,
      {},
      { withCredentials: true }
    );
  }
}
