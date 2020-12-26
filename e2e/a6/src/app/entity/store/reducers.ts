import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromUser from './user/user.reducer';

export interface State {
    users: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
    users: fromUser.reducer,
};

// feature selectors
export const selectUserState = createFeatureSelector<fromUser.State>('users');

export const selectUsers = createSelector(selectUserState, fromUser.adapter.getSelectors().selectAll);
