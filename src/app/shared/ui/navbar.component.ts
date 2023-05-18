import { Component, OnInit } from '@angular/core';
import { UserModel } from '../store/user.model';
import { filter, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { PersistUserService } from '../../services/persist.user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // @ts-ignore
  userObject: UserModel;
  subscription: Subscription = new Subscription();

  constructor(private router: Router,
              private cookieService: CookieService,
              private userStore: Store<AppState>,
              private persistUserService: PersistUserService) {
    this.persistUserService.loadData();
  }
  ngOnInit(): void {
    this.getUserStore();
  }

  logOut() {
    this.cookieService.delete('_g.e.username');
    this.router.navigate(['/login/']);
  }

  getUserStore() {
    this.subscription = this.userStore.select('user_state')
      .pipe(filter(user_state => user_state.user != null))
      .subscribe(user_state => {
        this.userObject =  new UserModel({
          email: user_state.user.email,
          username: user_state.user.username,
          name: user_state.user.name,
          lastname: user_state.user.lastname,
          apps: user_state.user.apps
        });
      });
  }

}
