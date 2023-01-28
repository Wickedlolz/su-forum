import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { emailValidator } from '../utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, emailValidator]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  handleLogin(): void {
    const body = {
      email: this.loginFormGroup.value.email,
      password: this.loginFormGroup.value.password,
    };

    this.userService.login(body).subscribe({
      next: (user) => {
        this.userService.user = user;
        this.userService.isLoggedIn = true;
        this.router.navigate(['/home']);
      },
      error: (error) => console.error(error),
    });
  }
}
