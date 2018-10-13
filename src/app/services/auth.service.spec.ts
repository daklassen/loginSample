import { TestBed, tick, fakeAsync, discardPeriodicTasks } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { LoginValue } from '../models/login-value';

describe('AuthService', () => {
  let service: AuthService;
  let getItemSpy;
  let setItemSpy;
  let removeItemSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });

    service = TestBed.get(AuthService);

    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    getItemSpy = spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    setItemSpy = spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    removeItemSpy = spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
  });

  afterEach(() => {
    getItemSpy.calls.reset();
    setItemSpy.calls.reset();
    removeItemSpy.calls.reset();
    localStorage.clear();
  });

  it('login should be successful with correct login data', done => {
    const userLogin: LoginValue = {
      email: 'testuser@t.de',
      password: '123'
    };

    service.login(userLogin).subscribe(loginSuccessful => {
      expect(loginSuccessful).toBeTruthy();
      expect(setItemSpy).toHaveBeenCalledWith('userIsLoggedIn', 'wannaBeJWT');
      expect(localStorage.getItem('userIsLoggedIn')).toEqual('wannaBeJWT');
      expect(service.userIsLoggedIn).toBeTruthy();
      done();
    });
  });

  it('login should be falsy with wrong login data', done => {
    const userLogin: LoginValue = {
      email: 'asd',
      password: 'asds'
    };

    service.login(userLogin).subscribe(loginSuccessful => {
      expect(loginSuccessful).toBeFalsy();
      expect(setItemSpy).not.toHaveBeenCalled();
      expect(localStorage.getItem('userIsLoggedIn')).toBeNull();
      expect(service.userIsLoggedIn).toBeFalsy();
      done();
    });
  });

  it('logout should remove item from local storage', done => {
    service.logout().subscribe(logoutSuccessful => {
      expect(logoutSuccessful).toBeTruthy();
      expect(removeItemSpy).toHaveBeenCalled();
      expect(service.userIsLoggedIn).toBeFalsy();
      done();
    });
  });
});
