import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { SetUserAction } from '../shared/store/user.actions';
import { UserModel } from '../shared/store/user.model';
import { appConfig } from 'src/app/config/config';

@Injectable({
    providedIn: 'root'
})
export class PersistUserService {

  nameSess: string;
    // @ts-ignore
  private user_data: UserModel;

  constructor(private store: Store<AppState>) {
    this.nameSess = appConfig.data_session;
    this.loadData();
  }

  loadData() {
    if (localStorage.getItem(this.nameSess)) {
      // @ts-ignore
      this.user_data = JSON.parse(atob(localStorage.getItem(this.nameSess)));
    } else {
      this.user_data = new UserModel({
        email: "",
        apps: [],
        name: "",
        lastname: "",
        username: ""
      });
    }
    this.store.dispatch(new SetUserAction(this.user_data));
    this.persistData(this.user_data);
  }

  persistData(user_data: UserModel) {
    this.user_data = user_data;
    let data_sess = btoa(JSON.stringify(this.user_data));
    localStorage.setItem(this.nameSess, data_sess);
  }

}
