import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { SetUserAction } from '../shared/store/user.actions';
import { UserModel } from '../shared/store/user.model';

@Injectable({
    providedIn: 'root'
})
export class PersistUserService {

    // @ts-ignore
  private user_data: UserModel;

  constructor(private store: Store<AppState>) {
    this.loadData();
  }

  loadData() {
    this.user_data = new UserModel({
      email: "",
      apps: [],
      name: "",
      lastname: "",
      username: ""
    });
    this.store.dispatch(new SetUserAction(this.user_data));
    this.persistData(this.user_data);
  }

  persistData(user_data: UserModel) {
    this.user_data = user_data;
  }

}
