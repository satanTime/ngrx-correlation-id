import { createAction, props } from '@ngrx/store';

import { User } from './user.model';

export const loadUser = createAction('[User] Load User', props<{ cid: string; fail: boolean }>());
export const upsertUser = createAction('[User] Upsert User', props<{ user: User }>());
