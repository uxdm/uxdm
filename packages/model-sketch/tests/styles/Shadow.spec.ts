import { SketchFormat } from '@uxdm/model-sketch';
import { Shadow } from '@uxdm/model-sketch/styles';

describe('Shadow 类', () => {
  it('toSketchJSON', () => {
    const shadow = new Shadow();
    // @ts-ignore
    shadow.type = '';
    const sketchShadow: SketchFormat.Shadow = {
      _class: 'shadow',
      blurRadius: 0,
      color: {
        _class: 'color',
        alpha: 1,
        blue: 0,
        green: 0,
        red: 0,
      },
      contextSettings: {
        _class: 'graphicsContextSettings',
        blendMode: 0,
        opacity: 1,
      },
      isEnabled: false,
      offsetX: 0,
      offsetY: 0,
      spread: 0,
    };
    expect(shadow.toSketchJSON()).toEqual(sketchShadow);
  });
});
