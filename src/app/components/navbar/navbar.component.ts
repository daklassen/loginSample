import { Component, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { takeWhile, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userisLoggedIn$: Observable<boolean>;
  logoutInProgress: boolean;
  mobileMenuVisible: boolean;

  private viewAlive: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.viewAlive = true;
    this.userisLoggedIn$ = this.authService.userIsLoggedIn$;
  }

  ngOnDestroy(): void {
    this.viewAlive = false;
  }

  logout(): void {
    this.logoutInProgress = true;
    this.authService
      .logout()
      .pipe(
        takeWhile(() => this.viewAlive),
        finalize(() => (this.logoutInProgress = false))
      )
      .subscribe(logoutSuccess => {
        if (logoutSuccess) {
          this.router.navigate(['/login']);
        }
      });
  }

  onNavbarBurgerClick(): void {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }
}
