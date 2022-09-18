import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { upsertUser } from './user.actions';
import { User } from './user.model';

export interface State extends EntityState<User> {}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState();

const internalReducer = createReducer(
  initialState,
  on(upsertUser, (state, { user }) => adapter.upsertOne(user, state)),
);

export function reducer(state = initialState, action) {
  return internalReducer(state, action);
}
