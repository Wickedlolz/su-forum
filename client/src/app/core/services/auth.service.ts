import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser, IUserLoginDto, IUserRegisterDto } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  user: IUser | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(userData: IUserLoginDto): Observable<IUser> {
    return this.http.post<IUser>(
      'http://localhost:5000/api/v1/auth/login',
      userData,
      {
        withCredentials: true,
      }
    );
  }

  register(userData: IUserRegisterDto): Observable<IUser> {
    return this.http.post<IUser>(
      'http://localhost:5000/api/v1/auth/register',
      userData,
      { withCredentials: true }
    );
  }

  authenticate(): Observable<IUser> {
    return this.http.get<IUser>('http://localhost:5000/api/v1/users/profile', {
      withCredentials: true,
    });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.user = null;
    this.router.navigate(['/home']);
  }
}
