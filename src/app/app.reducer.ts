import { ActionReducerMap } from '@ngrx/store';

import * as fromUser from './shared/store/user.reducer';

export interface AppState {
  user_state: fromUser.UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  // @ts-ignore
  user_state: fromUser.userReducer,
};
