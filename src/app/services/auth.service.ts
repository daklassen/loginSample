import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoginValue } from '../models/login-value';

const MOCKED_USER: LoginValue = {
  email: 'test@online.de',
  password: '123'
};

const MOCKED_API_CALL_DELAY = 1500;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  login(loginValue: LoginValue): Observable<boolean> {
    const loginValid =
      loginValue.email === MOCKED_USER.email && loginValue.password === MOCKED_USER.password;

    if (loginValid) {
      localStorage.setItem('userIsLoggedIn', 'true');
    }

    return of(loginValid).pipe(delay(MOCKED_API_CALL_DELAY));
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('userIsLoggedIn');
    return of(true).pipe(delay(MOCKED_API_CALL_DELAY));
  }

  isAuthenticated(): boolean {
    const userIsLoggedIn = localStorage.getItem('userIsLoggedIn') ? true : false;
    return userIsLoggedIn;
  }
}
