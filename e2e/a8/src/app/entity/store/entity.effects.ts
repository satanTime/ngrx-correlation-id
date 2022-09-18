import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { cidPayload, cidTask } from 'ngrx-correlation-id';
import { EMPTY, of, throwError, timer } from 'rxjs';
import { catchError, mapTo, repeat, switchMap } from 'rxjs/operators';
import { loadUser, upsertUser } from './user/user.actions';

@Injectable()
export class EntityEffects {
  public readonly load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMap(({ cid, fail }) =>
        cidTask(
          cid,
          timer(150).pipe(
            switchMap(value => (fail ? throwError('effect') : of(value))),
            mapTo(
              upsertUser({
                user: {
                  id: '1',
                  name: 'name',
                },
              }),
            ),
            switchMap(userAction => of(cidPayload({ cid: cid, payload: userAction.user.id }), userAction)),
          ),
        ),
      ),
      catchError(() => EMPTY),
      repeat(),
    ),
  );

  constructor(protected readonly actions$: Actions) {}
}
