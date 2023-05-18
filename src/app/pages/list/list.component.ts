import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from '../../shared/store/user.model';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { PersistUserService } from '../../services/persist.user.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  userData: any;
  // @ts-ignore
  userObject: UserModel;
  subscription: Subscription = new Subscription();

  constructor(private router: Router,
              private cookieService: CookieService,
              private store: Store<AppState>,
              private persistUserService: PersistUserService) {
  }

  ngOnInit(): void {
    this.getUserStore();
  }

  logOut() {
    this.cookieService.delete('_g.e.username');
    this.router.navigate(['/login/']);
  }

  getUserStore() {
    this.subscription = this.store.select('user_state')
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
