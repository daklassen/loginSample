import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { takeWhile, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  logoutInProgress: boolean;

  private viewAlive: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.viewAlive = true;
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
}
