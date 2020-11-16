import SketchFormat from '@sketch-hq/sketch-file-format-ts';

import { Shadow } from '../../src/styles';

describe('Shadow 类', () => {
  it('toSketchJSON', () => {
    const shadow = new Shadow();
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
