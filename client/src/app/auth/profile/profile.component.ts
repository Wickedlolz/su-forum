import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { IUser } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser!: IUser;
  newProfilePicture?: string | ArrayBuffer | null;
  isLoading: boolean = true;
  isInEditMode: boolean = false;
  errorMessage: string = '';

  @ViewChild('editProfileForm') editProfileForm!: NgForm;

  subscription!: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.subscription = this.userService.getUserProfile$().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error.error.message;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changeProfileMode(): void {
    this.isInEditMode = !this.isInEditMode;

    if (this.isInEditMode) {
      setTimeout(() => {
        this.editProfileForm.form.patchValue({
          email: this.currentUser.email,
          username: this.currentUser.username,
          tel: this.currentUser.tel,
          photoURL: this.currentUser.photoURL,
        });
      });
    }
  }

  handleUpdateProfile(): void {
    this.errorMessage = '';
    if (this.editProfileForm.invalid) return;

    const userDto = {
      tel: this.editProfileForm.value.tel,
      email: this.editProfileForm.value.email,
      username: this.editProfileForm.value.username,
      photoURL: this.newProfilePicture,
    };

    this.userService.updateUserProfile$(userDto).subscribe({
      next: (user) => {
        this.currentUser = user;
        this.changeProfileMode();
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
    });
  }

  handleProfilePictureChange(event: Event) {
    const input: HTMLInputElement = event.target as HTMLInputElement;

    if (input.files![0] && input.files![0].type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = () => {
        this.newProfilePicture = reader.result;
      };

      reader.readAsDataURL(input.files![0]);
    } else {
      this.newProfilePicture = undefined;
    }
  }
}
