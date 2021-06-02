import {Action} from '@ngrx/store';

import {CidTask} from './reducer';

export class CidStart implements Action {
    public readonly type: 'ngrx-correlation-id-start' = 'ngrx-correlation-id-start';

    constructor(public readonly cid: string) {}
}

const cidStartInternal: any = (props: any) => new CidStart(props.cid);
cidStartInternal.type = 'ngrx-correlation-id-start';
export const cidStart: {
    (props: {cid: string}): CidStart;
    type: 'ngrx-correlation-id-start';
} = cidStartInternal;

export class CidEnd implements Action {
    public readonly type: 'ngrx-correlation-id-end' = 'ngrx-correlation-id-end';

    constructor(public readonly cid: string) {}
}

export const cidEndInternal: any = (props: any) => new CidEnd(props.cid);
cidEndInternal.type = 'ngrx-correlation-id-end';
export const cidEnd: {
    (props: {cid: string}): CidEnd;
    type: 'ngrx-correlation-id-end';
} = cidEndInternal;

export class CidPayload<T = any> implements Action {
    public readonly type: 'ngrx-correlation-id-payload' = 'ngrx-correlation-id-payload';

    constructor(public readonly cid: string, public readonly payload?: CidTask<T>['payload']) {}
}

export const cidPayloadInternal: any = (props: any) => new CidPayload(props.cid, props.payload);
cidPayloadInternal.type = 'ngrx-correlation-id-payload';
export const cidPayload: {
    <T = any>(props: {cid: string; payload: CidTask<T>['payload']}): CidPayload;
    type: 'ngrx-correlation-id-payload';
} = cidPayloadInternal;

export class CidRemove implements Action {
    public readonly type: 'ngrx-correlation-id-remove' = 'ngrx-correlation-id-remove';

    constructor(public readonly cid: string) {}
}

export const cidRemoveInternal: any = (props: any) => new CidRemove(props.cid);
cidRemoveInternal.type = 'ngrx-correlation-id-remove';
export const cidRemove: {
    (props: {cid: string}): CidRemove;
    type: 'ngrx-correlation-id-remove';
} = cidRemoveInternal;

export type CidActions = CidStart | CidEnd | CidPayload | CidRemove;
