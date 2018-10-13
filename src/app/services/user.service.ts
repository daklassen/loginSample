import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { of, Observable } from 'rxjs';

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
