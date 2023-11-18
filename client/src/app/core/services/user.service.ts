import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser, IUserLoginDto, IUserRegisterDto } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  getUserProfile(): Observable<IUser> {
    return this.http.get<IUser>('http://localhost:5000/api/v1/users/profile', {
      withCredentials: true,
    });
  }
}
