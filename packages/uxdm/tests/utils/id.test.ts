import { generateID } from 'uxdm/utils';

describe('id', () => {
  it('should id', () => {
    expect(generateID()).toEqual('id');
  });
});
