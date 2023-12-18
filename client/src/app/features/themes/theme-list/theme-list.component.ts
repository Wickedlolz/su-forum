import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Subscription,
  combineLatest,
  debounceTime,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ITheme } from 'src/app/core/interfaces/theme';
import { IPost } from 'src/app/core/interfaces/post';
import { IUser } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css'],
})
export class ThemeListComponent implements OnInit, OnDestroy {
  themes!: ITheme[];
  isLoading: boolean = true;
  subscription!: Subscription;
  themesCount: number = 0;
  currentPage: number = 1;

  get pageSize(): number {
    return Number(this.activatedRoute.snapshot.queryParams['limit']) || 5;
  }

  get offset(): number {
    return Number(this.activatedRoute.snapshot.queryParams['offset']) || 0;
  }

  searchControl = new FormControl('');

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const queryParams$ = this.activatedRoute.queryParams.pipe(
      map((params) => ({
        search: params['search'] || '',
        limit: Number(params['limit']) || this.pageSize,
        offset: Number(params['offset']) || this.offset,
      })),
      tap(({ search, limit, offset }) => {
        this.isLoading = true;
        this.changingQueryParams(search, limit, offset);
      })
    );

    const searchControl$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      tap((searchTerm) => {
        this.isLoading = true;
        this.changingQueryParams(searchTerm!);
      })
    );

    this.subscription = combineLatest([queryParams$, searchControl$])
      .pipe(
        switchMap(([queryParams, searchTerm]) =>
          this.themeService.loadThemes$(
            queryParams.limit,
            queryParams.offset,
            searchTerm!
          )
        )
      )
      .subscribe({
        next: ({ themes, count }) => {
          this.themes = themes;
          this.themesCount = count;
          this.currentPage = Math.ceil((this.offset + 1) / this.pageSize);
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changingQueryParams(
    search?: string,
    limit = this.pageSize,
    offset = this.offset
  ) {
    const queryParams: Params = {
      limit,
      offset,
    };

    if (search) {
      queryParams['search'] = search;
    } else {
      queryParams['search'] = undefined;
    }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  handleUpdateTheme(updatedTheme: ITheme<IPost, string | IUser>) {
    const themeIndex = this.themes.findIndex((t) => t._id === updatedTheme._id);

    this.themes[themeIndex] = updatedTheme as unknown as ITheme;
  }

  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.themesCount / this.pageSize);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  handleNextPage() {
    const newOffset = this.offset + 1 * this.pageSize;

    this.changingQueryParams(
      this.activatedRoute.snapshot.queryParams['search'],
      this.pageSize,
      newOffset
    );
  }

  handlePageClick(pageNumber: number) {
    this.changingQueryParams(
      this.activatedRoute.snapshot.queryParams['search'],
      this.pageSize,
      (pageNumber - 1) * this.pageSize
    );
  }

  handlePreviousPage() {
    const newOffset = Math.max(this.offset - this.pageSize, 0);
    this.changingQueryParams(
      this.activatedRoute.snapshot.queryParams['search'],
      this.pageSize,
      newOffset
    );
  }
}
