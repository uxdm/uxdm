import { Color } from '../../src/styles';

describe('Color 类', () => {
  describe('toSketchJSON', () => {
    it('正常解析', () => {
      const color = new Color();

      expect(color.toSketchJSON()).toEqual({
        _class: 'color',
        alpha: 1,
        blue: 0,
        green: 0,
        red: 0,
      });
    });
  });
});
