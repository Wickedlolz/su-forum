import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser!: IUser;
  isLoading: boolean = true;
  isInEditMode: boolean = false;

  subscription!: Subscription;

  constructor(private userService: UserService) {}

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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
