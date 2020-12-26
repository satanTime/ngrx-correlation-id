import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {UserActions} from './user.actions';
import {User} from './user.model';

export interface State extends EntityState<User> {}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: UserActions) {
    switch (action.type) {
        case '[User] Upsert User':
            return adapter.upsertOne(action.user, state);
    }

    return state;
}
