import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import {finalize, skipWhile, take} from 'rxjs/operators';

import {cidEnd, cidStart} from './actions';
import {ngrxCorrelationIdStore} from './module';
import {CidTask} from './reducer';

export const cidTask = (cid: string, stream: Observable<Action>): Observable<Action> => {
  if (ngrxCorrelationIdStore) {
    ngrxCorrelationIdStore.dispatch(cidStart({cid}));
  }
  return stream.pipe(finalize(() => ngrxCorrelationIdStore && ngrxCorrelationIdStore.dispatch(cidEnd({cid}))));
};

export const cidWait =
  () =>
  <T extends CidTask>(next: Observable<T>): Observable<T> => {
    return next.pipe(
      skipWhile(data => !data.inProgress),
      skipWhile(data => data.inProgress),
      take(1),
    );
  };
