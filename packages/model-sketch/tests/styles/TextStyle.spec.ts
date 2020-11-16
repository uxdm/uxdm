import { TextStyle } from '../../src/styles';

describe('TextStyle 类', () => {
  describe('toSketchJSON', () => {
    it('正常解析', () => {
      const textStyle = new TextStyle();

      expect(textStyle.toSketchJSON()).toMatchSnapshot();
    });
  });
});
