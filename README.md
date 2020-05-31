# ngrx-correlation-id

A ngrx store library to track an asynchronous activity such as a http request, a ngrx effect or anything else.

### Supports
- Angular 6 and `ngrx/store@6`
- Angular 7 and `ngrx/store@7`
- Angular 8 and `ngrx/store@8`
- Angular 9 and `ngrx/store@9`

### API short list

Please check source code

- NgrxCorrelationIdModule
* CidTask
- cidTask(correlationId, Observable<any>)
- cidWait()
* store.select(selectCid, correlationId)
- cidStart(correlationId: string)
- cidPayload(correlationId: string, payload: any)
- cidEnd(correlationId: string)
- cidRemove(correlationId: string)

## How to use

Import `NgrxCorrelationIdModule` in the same module where you import `StoreModule.forRoot`.

```typescript
import {NgrxCorrelationIdModule} from 'ngrx-correlation-id';

@NgModule({
    imports: [
        StoreModule.forRoot(/* ... */),
        NgrxCorrelationIdModule, // <- import it here
    ],
})
export class AppModule {}
```

Add `cid: string` to props of an action you want to track.

```typescript
export const loadUsers = createAction(
  '[User] Load Users',
  props<{cid: string}>(), // <- correlation id
);
```

Wrap an effect pipe with `cidTask`.
The first argument is a `cid` of the current task.
The second argument is a stream that should be tracked.

Optionally you can dispatch `cidPayload` action with a custom payload.
In this case we want our payload to be an array of ids of users.

```typescript
import {cidPayload, cidTask} from 'ngrx-correlation-id';

@Injectable()
export class UsersEffects {
    @Effect()
    public readonly loadUsers$ = this.actions$.pipe(
        ofType(loadUsers),
        switchMap(({cid}) => cidTask(cid, this.http.get<Array<User>>('v2/api/users').pipe(
            switchMap(users => of(
                upsertUsers({items: users}),
                cidPayload({cid, payload: users.map(user => user.id)}),
            )),
        ))),
    );

    constructor(
        protected readonly actions$: Actions,
        private readonly http: HttpClient,
    ) {}
}
```

Update a component to use `cid` and all the features of the lib.

```typescript
import {cidRemove, CidTask, cidWait, selectCid} from 'ngrx-correlation-id';

export class EntityComponent implements OnInit, OnDestroy {
    public readonly users$: Observable<Array<User>>;

    // set here an unique value to distinguish this task from others.
    private readonly cid: string = `randomString`;

    constructor(private readonly store: Store) {
        // selecting the related task that belongs to cid.
        this.users$ = this.store.select<CidTask<Array<string>>>(selectCid, this.cid).pipe(

            // doesn't emit until the task isn't completed
            cidWait(), // waits until the task starts, then waits until the task ends and the task.

            map(task => task.payload),
            withLatestFrom(this.store.select(selectUsers)),
            map(([ids, users]) => users && users.filter(user => ids.indexOf(user.id) !== -1) || []),
        );
    }

    public ngOnInit(): void {
        // dispatching an action to load users.
        this.store.dispatch(loadUsers({cid: this.cid}));
    }

    public ngOnDestroy(): void {
        // clearing payload and selector
        this.store.dispatch(cidRemove({cid: this.cid}));
        selectCid.release();
    }
}
```
