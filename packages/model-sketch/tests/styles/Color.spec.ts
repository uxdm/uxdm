import { Color } from '@uxdm/model-sketch/styles';
import { SketchFormat } from '@uxdm/model-sketch';

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

  it('fromSketchJSON', () => {
    const input: SketchFormat.Color = {
      _class: 'color',
      alpha: 1,
      blue: 0.6528221187004988,
      green: 0.6528221187004988,
      red: 0.7786741394927537,
    };
    const color = Color.fromSketchJSON(input);
    expect(color.alpha).toBe(1);
    expect(color.red).toBe(199);
    expect(color.blue).toBe(166);
    expect(color.green).toBe(166);
  });
});
