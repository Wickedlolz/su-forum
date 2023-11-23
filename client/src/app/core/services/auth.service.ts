import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUserLoginDto, IUserRegisterDto } from '../interfaces/user';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

const endpoints = {
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  profile: '/users/profile',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  user: IUser | null = null;

  constructor(private httpClient: HttpClient) {}

  login(userData: IUserLoginDto): Observable<IUser> {
    return this.httpClient.post<IUser>(
      `${apiUrl}${endpoints.login}`,
      userData,
      {
        withCredentials: true,
      }
    );
  }

  register(userData: IUserRegisterDto): Observable<IUser> {
    return this.httpClient.post<IUser>(
      `${apiUrl}${endpoints.register}`,
      userData,
      {
        withCredentials: true,
      }
    );
  }

  authenticate(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${apiUrl}${endpoints.profile}`, {
      withCredentials: true,
    });
  }

  logout() {
    return this.httpClient.get(`${apiUrl}${endpoints.logout}`, {
      withCredentials: true,
    });
  }
}
