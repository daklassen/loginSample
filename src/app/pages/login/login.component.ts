import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { takeWhile, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginValue } from '../../models/login-value';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  showLoginError: boolean;
  loginInProgress: boolean;

  private viewAlive: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.toHomeIfAlreadyLoggedIn();
    this.viewAlive = true;
  }

  ngOnDestroy(): void {
    this.viewAlive = false;
  }

  login(loginValue: LoginValue): void {
    this.showLoginError = false;
    this.loginInProgress = true;
    this.authService
      .login(loginValue)
      .pipe(
        takeWhile(() => this.viewAlive),
        finalize(() => (this.loginInProgress = false))
      )
      .subscribe(loginSuccess => {
        this.showLoginError = !loginSuccess;
        if (loginSuccess) {
          this.router.navigate(['/home']);
        }
      });
  }

  private toHomeIfAlreadyLoggedIn(): void {
    if (this.authService.userIsLoggedIn) {
      this.router.navigate(['/home']);
    }
  }
}
