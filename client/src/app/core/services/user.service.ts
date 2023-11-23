import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUserProfile(): Observable<IUser> {
    return this.httpClient.get<IUser>(
      'http://localhost:5000/api/v1/users/profile',
      {
        withCredentials: true,
      }
    );
  }
}
