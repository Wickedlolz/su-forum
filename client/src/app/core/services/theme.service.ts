import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITheme, IThemeDto } from '../interfaces/theme';
import { environment } from 'src/environments/environment';
import { IPost } from '../interfaces/post';

const apiUrl = environment.apiUrl;

const endpoints = {
  themes: '/themes',
  themeById: (themeId: string) => `/themes/${themeId}`,
};

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private httpClient: HttpClient) {}

  loadThemes$(): Observable<ITheme[]> {
    return this.httpClient.get<ITheme[]>(`${apiUrl}${endpoints.themes}`);
  }

  loadThemeById$(themeId: string): Observable<ITheme<IPost>> {
    return this.httpClient.get<ITheme<IPost>>(
      `${apiUrl}${endpoints.themeById(themeId)}`
    );
  }

  addTheme$(themeData: IThemeDto): Observable<ITheme> {
    return this.httpClient.post<ITheme>(
      `${apiUrl}${endpoints.themes}`,
      themeData,
      {
        withCredentials: true,
      }
    );
  }
}
