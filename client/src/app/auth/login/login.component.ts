import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  handleLogin(): void {
    this.userService.login();
    this.router.navigate(['/home']);
  }
}
