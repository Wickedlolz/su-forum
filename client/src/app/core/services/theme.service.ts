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
  constructor(private http: HttpClient) {}

  loadThemes$(): Observable<ITheme[]> {
    return this.http.get<ITheme[]>(`${apiUrl}${endpoints.themes}`);
  }

  loadThemeById$(themeId: string): Observable<ITheme<IPost>> {
    return this.http.get<ITheme<IPost>>(
      `${apiUrl}${endpoints.themeById(themeId)}`
    );
  }

  addTheme(themeData: IThemeDto): Observable<ITheme> {
    return this.http.post<ITheme>(`${apiUrl}${endpoints.themes}`, themeData, {
      withCredentials: true,
    });
  }
}
