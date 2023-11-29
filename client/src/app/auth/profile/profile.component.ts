import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser!: IUser;
  isLoading: boolean = true;
  isInEditMode: boolean = false;

  @ViewChild('editProfileForm') editProfileForm!: NgForm;

  subscription!: Subscription;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.userService.getUserProfile().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  changeProfileMode(): void {
    this.isInEditMode = !this.isInEditMode;

    if (this.isInEditMode) {
      setTimeout(() => {
        this.editProfileForm.form.patchValue({
          email: this.currentUser.email,
          username: this.currentUser.username,
          tel: this.currentUser.tel,
        });
      });
    }
  }

  handleUpdateProfile(): void {
    if (this.editProfileForm.invalid) return;

    const userDto = {
      tel: this.editProfileForm.value.tel,
      email: this.editProfileForm.value.email,
      username: this.editProfileForm.value.username,
    };

    this.userService.updateUserProfile$(userDto).subscribe({
      next: (user) => {
        this.currentUser = user;
        this.authService.user = user;
        this.changeProfileMode();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
