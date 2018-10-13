import { Injectable, OnInit } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { LoginValue } from '../models/login-value';

const ONLY_VALID_USER: LoginValue = {
  email: 'testuser@t.de',
  password: '123'
};

const MOCKED_API_CALL_DELAY = 1500;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userIsloggedIn = new BehaviorSubject<boolean>(false);

  get userIsLoggedIn() {
    return this.userIsloggedIn.getValue();
  }

  get userIsLoggedIn$() {
    return this.userIsloggedIn.asObservable();
  }

  constructor() {
    const userIsLoggedIn = localStorage.getItem('userIsLoggedIn') ? true : false;
    this.userIsloggedIn.next(userIsLoggedIn);
  }

  login(loginValue: LoginValue): Observable<boolean> {
    const loginValid =
      loginValue.email === ONLY_VALID_USER.email &&
      loginValue.password === ONLY_VALID_USER.password;

    if (loginValid) {
      return of(true).pipe(
        delay(MOCKED_API_CALL_DELAY),
        tap(() => {
          localStorage.setItem('userIsLoggedIn', 'wannaBeJWT');
          this.userIsloggedIn.next(true);
        })
      );
    }

    return of(false).pipe(delay(MOCKED_API_CALL_DELAY));
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('userIsLoggedIn');
    this.userIsloggedIn.next(false);
    return of(true);
  }
}
