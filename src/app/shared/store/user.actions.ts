import { Action } from '@ngrx/store';
import { UserModel } from './user.model';

export const SET_USER = '[USER DATA] Set User data';
export const UNSET_USER = '[USER DATA] Unset User data';

export class SetUserAction implements Action {
    readonly  type = SET_USER;

    constructor (public user: UserModel) {}
}

export class UnsetUserAction implements Action {
    readonly  type = UNSET_USER;
}

export type actions = SetUserAction | UnsetUserAction;
