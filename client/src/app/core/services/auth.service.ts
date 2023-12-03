import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, map, tap } from 'rxjs';
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
  private _currentUser = new BehaviorSubject<IUser | undefined>(undefined);

  currentUser$ = this._currentUser.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map((user) => !!user));

  constructor(private httpClient: HttpClient) {}

  login$(userData: IUserLoginDto): Observable<IUser | null> {
    return this.httpClient
      .post<IUser>(`${apiUrl}${endpoints.login}`, userData, {
        observe: 'response',
      })
      .pipe(map((response) => response.body));
  }

  register$(userData: IUserRegisterDto): Observable<IUser> {
    return this.httpClient.post<IUser>(
      `${apiUrl}${endpoints.register}`,
      userData
    );
  }

  authenticate$(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${apiUrl}${endpoints.profile}`).pipe(
      tap((currentProfile) => {
        this.handleLogin(currentProfile);
      }),
      catchError((error) => EMPTY)
    );
  }

  logout$() {
    return this.httpClient.get(`${apiUrl}${endpoints.logout}`);
  }

  handleLogin(newUser: IUser) {
    this._currentUser.next(newUser);
  }

  handleLogout() {
    this._currentUser.next(undefined);
  }
}
