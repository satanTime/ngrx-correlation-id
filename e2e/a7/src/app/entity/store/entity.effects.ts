import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {cidPayload, cidTask} from 'ngrx-correlation-id';
import {EMPTY, of, throwError, timer} from 'rxjs';
import {catchError, mapTo, repeat, switchMap} from 'rxjs/operators';
import {LoadUser, UpsertUser} from './user/user.actions';

@Injectable()
export class EntityEffects {
  @Effect()
  public readonly load$ = this.actions$.pipe(
    ofType<LoadUser, LoadUser['type'], LoadUser>('[User] Load User'),
    switchMap(({cid, fail}) =>
      cidTask(
        cid,
        timer(150).pipe(
          switchMap(value => (fail ? throwError('effect') : of(value))),
          mapTo(
            new UpsertUser({
              id: '1',
              name: 'name',
            }),
          ),
          switchMap(userAction => of(cidPayload({cid: cid, payload: userAction.user.id}), userAction)),
        ),
      ),
    ),
    catchError(() => EMPTY),
    repeat(),
  );

  constructor(protected readonly actions$: Actions) {}
}
