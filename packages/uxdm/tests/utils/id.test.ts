import { generateID } from '../../src/utils';

describe('id', () => {
  it('should id', () => {
    expect(generateID()).toEqual('id');
  });
});
