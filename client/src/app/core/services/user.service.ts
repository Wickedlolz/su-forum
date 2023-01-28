import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user';

interface IUserLoginDto {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn: boolean = false;
  user: IUser | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(userData: IUserLoginDto): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:3000/api/login', userData, {
      withCredentials: true,
    });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.user = null;
    this.router.navigate(['/home']);
  }
}
