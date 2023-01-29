import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordMatch } from '../utils';

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

  registerFormGroup: FormGroup = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    passwords: new FormGroup({
      password: this.passwordControl,
      rePassword: new FormControl(null, [passwordMatch(this.passwordControl)]),
    }),
  });

  constructor(private formBuilder: FormBuilder) {}

  handleRegister(): void {
    console.log(this.registerFormGroup.controls);
  }
}
