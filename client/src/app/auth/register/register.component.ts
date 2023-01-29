import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IUserRegisterDto } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';
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
    tel: new FormControl('', [Validators.required]),
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
    private userService: UserService,
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

    this.userService.register(body).subscribe({
      next: (user) => {
        this.userService.user = user;
        this.userService.isLoggedIn = true;
        this.router.navigate(['/home']);
      },
      error: (error) => console.error(error),
    });
  }
}
