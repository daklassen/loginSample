import { Injectable } from '@angular/core';
import { User } from '../models/login-value';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

const MOCKED_USER: User = {
  firstName: 'Hans',
  lastName: 'Dampf',
  email: 'testuser@t.de',
  password: '123'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  loadUserData(): Observable<User> {
    return of(MOCKED_USER);
  }
}
