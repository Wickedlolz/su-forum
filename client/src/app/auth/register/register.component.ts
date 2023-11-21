import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUserRegisterDto } from 'src/app/core/interfaces/user';
import { emailValidator, passwordMatch } from '../utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  passwordControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(5),
  ]);

  get passwordGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, emailValidator]),
    tel: new FormControl('', []),
    passwords: new FormGroup({
      password: this.passwordControl,
      rePassword: new FormControl(null, [
        Validators.required,
        passwordMatch(this.passwordControl),
      ]),
    }),
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  handleRegister(): void {
    if (this.registerFormGroup.invalid) return;

    const body: IUserRegisterDto = {
      username: this.registerFormGroup.value.username,
      email: this.registerFormGroup.value.email,
      tel: this.registerFormGroup.value.tel,
      password: this.registerFormGroup.value.passwords.password,
    };

    this.authService.register(body).subscribe({
      next: (user) => {
        this.authService.user = user;
        this.authService.isLoggedIn = true;
        this.router.navigate(['/home']);
      },
      error: (error) => console.error(error),
    });
  }
}
