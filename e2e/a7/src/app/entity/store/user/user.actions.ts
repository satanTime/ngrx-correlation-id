import {Action} from '@ngrx/store';

import {User} from './user.model';

export class LoadUser implements Action {
    public readonly type = '[User] Load User';

    constructor(public readonly cid: string, public readonly fail?: boolean) {}
}

export class UpsertUser implements Action {
    public readonly type = '[User] Upsert User';

    constructor(public readonly user: User) {}
}

export type UserActions = LoadUser | UpsertUser;
