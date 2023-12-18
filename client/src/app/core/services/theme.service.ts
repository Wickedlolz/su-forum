import {
  HttpClient,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITheme, IThemeDto, IThemeResponse } from '../interfaces/theme';
import { IPost, IPostDto } from '../interfaces/post';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

type HttpParamsOptionsType = HttpParamsOptions['fromObject'];

const endpoints = {
  themes: '/themes',
  themeById: (themeId: string) => `/themes/${themeId}`,
};

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private httpClient: HttpClient) {}

  loadThemes$(
    limit: number,
    offset: number,
    searchTearm?: string
  ): Observable<IThemeResponse> {
    const options: HttpParamsOptionsType = {
      title: '',
      limit,
      offset,
    };

    if (searchTearm) {
      options['title'] = searchTearm;
    }

    return this.httpClient.get<IThemeResponse>(`${apiUrl}${endpoints.themes}`, {
      params: new HttpParams({
        fromObject: options,
      }),
    });
  }

  loadThemeById$(themeId: string): Observable<ITheme<IPost, string>> {
    return this.httpClient.get<ITheme<IPost, string>>(
      `${apiUrl}${endpoints.themeById(themeId)}`
    );
  }

  addTheme$(themeData: IThemeDto): Observable<ITheme> {
    return this.httpClient.post<ITheme>(
      `${apiUrl}${endpoints.themes}`,
      themeData
    );
  }

  addPost$(themeId: string, postDto: IPostDto) {
    return this.httpClient.post<ITheme<IPost, string>>(
      `${apiUrl}${endpoints.themeById(themeId)}`,
      postDto
    );
  }

  subscribe$(themeId: string) {
    return this.httpClient.put<ITheme<IPost>>(
      `${apiUrl}${endpoints.themeById(themeId)}`,
      {}
    );
  }
}
