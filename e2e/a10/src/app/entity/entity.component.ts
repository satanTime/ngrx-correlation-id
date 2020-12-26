import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {cidEnd, cidPayload, cidRemove, cidStart, CidTask, cidWait, selectCid} from 'ngrx-correlation-id';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {repeatWhen, startWith, tap} from 'rxjs/operators';
import {loadUser} from 'src/app/entity/store/user/user.actions';
import {selectUsers, State} from './store/reducers';

@Component({
    selector: 'app-entity',
    templateUrl: './entity.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityComponent implements OnDestroy {
    public readonly feature$: Observable<any>;
    public readonly task$: Observable<CidTask>;
    public readonly taskWait$: Observable<CidTask>;

    public readonly reset$ = new Subject<void>();
    public readonly history$ = new BehaviorSubject([]);

    private readonly cid: string = `${Math.random()}`;

    constructor(protected readonly store: Store<State>) {
        this.feature$ = this.store.select((s: any) => s.ngrxCorrelationId);
        this.task$ = this.store.select(selectCid, this.cid);

        this.taskWait$ = this.store.select(selectCid, this.cid).pipe(
            cidWait(),
            tap(v => this.history$.next([...this.history$.value, v])),
            startWith(null),
            repeatWhen(() =>
                this.reset$.pipe(
                    tap(() => {
                        this.taskRemove();
                        this.history$.next([]);
                    }),
                ),
            ),
        );
    }

    public ngOnDestroy(): void {
        selectCid.release();
        selectUsers.release();
    }

    public taskStart(): void {
        this.store.dispatch(cidStart({cid: this.cid}));
    }

    public taskEnd(): void {
        this.store.dispatch(cidEnd({cid: this.cid}));
    }

    public taskRemove(): void {
        this.store.dispatch(cidRemove({cid: this.cid}));
    }

    public taskPayload<T>(payload: T): void {
        this.store.dispatch(cidPayload({cid: this.cid, payload}));
    }

    public effect(fail: boolean): void {
        this.store.dispatch(loadUser({cid: this.cid, fail}));
    }
}
