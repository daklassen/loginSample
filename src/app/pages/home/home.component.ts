import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/login-value';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  logoutInProgress: boolean;
  currentUser: User;

  private viewAlive: boolean;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.viewAlive = true;
    this.loadCurrentUserData();
  }

  ngOnDestroy(): void {
    this.viewAlive = false;
  }

  private loadCurrentUserData(): void {
    this.userService
      .loadUserData()
      .pipe(takeWhile(() => this.viewAlive))
      .subscribe((userData: User) => {
        this.currentUser = userData;
      });
  }
}
