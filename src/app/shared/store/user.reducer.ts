import * as fromUser from './user.actions';
import { UserModel } from './user.model';


export interface UserState {
    user: UserModel
}

const initState: UserState = {
    user : {
      "email": "",
      "apps": [],
      "name": "",
      "lastname": "",
      "username": ""
    }
};

export function userReducer(state = initState, action: fromUser.actions): UserState {

    switch (action.type) {

        case fromUser.SET_USER:
            return {
                user: {... action.user}
            };

        case fromUser.UNSET_USER:
            return {
              user : {
                "email": "",
                "apps": [],
                "name": "",
                "lastname": "",
                "username": ""
              }
            };

        default:
            return state;
    }

}
