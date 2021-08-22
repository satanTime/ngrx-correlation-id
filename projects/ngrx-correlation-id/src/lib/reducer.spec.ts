import {cidReducer, selectCidFeature} from './reducer';
import {cidRemove} from './actions';

describe('reducer', () => {
  describe('selectCidFeature', () => {
    it('selects right node', () => {
      const state = {
        ngrxCorrelationId: {
          tasks: [],
          payloads: {},
        },
      };
      expect(selectCidFeature(state)).toBe(state.ngrxCorrelationId);
    });
  });

  describe('cidReducer', () => {
    it('removes only current cid', () => {
      const state = {
        tasks: [],
        payloads: {
          1: {id: 1},
          2: {id: 2},
          3: {id: 3},
          4: undefined,
        },
      };
      expect(
        cidReducer(
          state,
          cidRemove({
            cid: '2',
          }),
        ),
      ).toEqual({
        tasks: [],
        payloads: {
          1: {id: 1},
          3: {id: 3},
        },
      });
    });
  });
});
