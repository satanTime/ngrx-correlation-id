import {selectCidFeature} from './reducer';

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
});
