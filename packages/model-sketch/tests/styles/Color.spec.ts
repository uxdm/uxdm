import { Color } from '../../src/styles';

describe('Color 类', () => {
  describe('toSketchJSON', () => {
    it('正常解析', () => {
      const color = new Color();

      expect(color.toSketchJSON()).toMatchSnapshot();
    });
  });
});
