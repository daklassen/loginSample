import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser$: Observable<User>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.currentUser$ = this.userService.loadUserData();
  }
}
