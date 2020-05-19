import {createAction, props} from '@ngrx/store';

import {CidTask} from './reducer';

export const cidStart = createAction(
    'ngrx-correlation-id-start',
    props<{
        cid: string;
    }>(),
);

export const cidEnd = createAction(
    'ngrx-correlation-id-end',
    props<{
        cid: string;
    }>(),
);

export const cidPayload = createAction(
    'ngrx-correlation-id-payload',
    props<{
        cid: string;
        payload?: CidTask['payload'];
    }>(),
);

export const cidRemove = createAction(
    'ngrx-correlation-id-remove',
    props<{
        cid: string;
    }>(),
);
