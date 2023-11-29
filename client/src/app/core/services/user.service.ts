import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUserUpdateDto } from '../interfaces/user';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

const endpoints = {
  userProfile: '/users/profile',
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUserProfile(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${apiUrl}${endpoints.userProfile}`, {
      withCredentials: true,
    });
  }

  updateUserProfile$(userDto: IUserUpdateDto): Observable<IUser> {
    return this.httpClient.put<IUser>(
      `${apiUrl}${endpoints.userProfile}`,
      userDto,
      { withCredentials: true }
    );
  }
}
