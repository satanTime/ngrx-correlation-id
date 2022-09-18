import { createFeatureSelector } from '@ngrx/store';

import { CidActions, cidEnd, cidPayload, cidRemove, cidStart } from './actions';

export interface CidTask<T = any> {
  cid: string;
  inProgress: boolean;
  payload?: T;
}

export interface State<T = any> {
  tasks: Array<string>;
  payloads: {
    [taskId: string]: CidTask<T>['payload'];
  };
}

const initialState: State = {
  tasks: [],
  payloads: {},
};

export function cidReducer(state: State = initialState, action: CidActions): State {
  switch (action.type) {
    case cidStart.type: {
      return {
        ...state,
        tasks: [...state.tasks, action.cid],
      };
    }

    case cidEnd.type: {
      const index = state.tasks.indexOf(action.cid);
      if (index === -1) {
        return state;
      }
      return {
        ...state,
        tasks: state.tasks.filter((_, taskIndex) => taskIndex !== index),
      };
    }

    case cidPayload.type: {
      if (state.payloads[action.cid] === action.payload) {
        return state;
      }
      return {
        ...state,
        payloads: {
          ...state.payloads,
          [action.cid]: action.payload,
        },
      };
    }

    case cidRemove.type: {
      if (state.tasks.indexOf(action.cid) === -1 && state.payloads[action.cid] === undefined) {
        return state;
      }

      const payloads: Record<keyof any, unknown> = {};
      for (const taskId of Object.keys(state.payloads)) {
        if (taskId !== action.cid && state.payloads[taskId] !== undefined) {
          payloads[taskId] = state.payloads[taskId];
        }
      }

      return {
        ...state,
        tasks:
          state.tasks.indexOf(action.cid) === -1 ? state.tasks : state.tasks.filter(taskId => taskId !== action.cid),
        payloads: state.payloads[action.cid] === undefined ? state.payloads : payloads,
      };
    }
  }

  return state;
}

export const selectCidFeature: <T extends object>(state: T) => State = createFeatureSelector('ngrxCorrelationId');

const selectCidResult = new Map<string, CidTask>();
const selectCidInternal: any = (state: any, cid: string) => {
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
selectCidInternal.release = () => {
  selectCidResult.clear();
};

export const selectCid: {
  <T = any>(state: any, cid: string): CidTask<T>;
  release(): void;
} = selectCidInternal;
