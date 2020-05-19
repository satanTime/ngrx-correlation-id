import {Action, createFeatureSelector, createReducer, on} from '@ngrx/store';

import {cidEnd, cidPayload, cidRemove, cidStart} from './actions';

export interface CidTask<T = any> {
    cid: string;
    inProgress: boolean;
    payload?: T;
}

export interface State {
    tasks: Array<string>;
    payloads: {
        [taskId: string]: CidTask['payload'];
    };
}

const initialState: State = {
    tasks: [],
    payloads: {},
};

const reducer = createReducer(
    initialState,

    on(cidStart, (state, {cid}) => {
        return {
            ...state,
            tasks: [...state.tasks, cid],
        };
    }),

    on(cidEnd, (state, {cid}) => {
        const index = state.tasks.indexOf(cid);
        if (index === -1) {
            return state;
        }
        return {
            ...state,
            tasks: state.tasks.filter((_, taskIndex) => taskIndex !== index),
        };
    }),

    on(cidPayload, (state, {cid, payload}) => {
        if (state.payloads[cid] === payload) {
            return state;
        }
        return {
            ...state,
            payloads: {
                ...state.payloads,
                [cid]: payload,
            },
        };
    }),

    on(cidRemove, (state, {cid}) => {
        if (state.tasks.indexOf(cid) === -1 && state.payloads[cid] === undefined) {
            return state;
        }
        return {
            ...state,
            tasks: state.tasks.indexOf(cid) === -1 ? state.tasks : state.tasks.filter(taskId => taskId !== cid),
            payloads:
                state.payloads[cid] === undefined
                    ? state.payloads
                    : Object.keys(state.payloads).reduce<State['payloads']>((result, taskId) => {
                          if (taskId !== cid && state.payloads[cid] !== undefined) {
                              result[cid] = state.payloads[cid];
                          }
                          return result;
                      }, {}),
        };
    }),
);

export function cidReducer(state: State, action: Action): State {
    return reducer(state, action);
}

export const selectCidFeature = createFeatureSelector<State>('ngrxCorrelationId');

const selectCidResult = new Map<string, CidTask>();
export const selectCid = (state: any, cid: string) => {
    const feature = selectCidFeature(state);
    const actual = {
        cid,
        inProgress: feature.tasks.indexOf(cid) !== -1,
        payload: feature.payloads[cid],
    };
    const old = selectCidResult.get(cid);
    // in progress shouldn't be affected by payload change
    if (old && old.inProgress && old.inProgress === actual.inProgress && old.cid === actual.cid) {
        return old;
    }
    if (old && old.inProgress === actual.inProgress && old.cid === actual.cid && old.payload === actual.payload) {
        return old;
    }
    selectCidResult.set(cid, actual);
    return actual;
};
selectCid.release = () => {
    selectCidResult.clear();
};
