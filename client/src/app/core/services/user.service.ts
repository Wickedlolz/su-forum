import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
}
