import { Style } from '../../src/styles';

describe('Style 类', () => {
  it('toSketchJSON', () => {
    const style = new Style();

    expect(style.toSketchJSON()).toEqual({
      _class: 'style',
      borderOptions: {
        _class: 'borderOptions',
        dashPattern: [],
        isEnabled: false,
        lineCapStyle: 0,
        lineJoinStyle: 0,
      },
      borders: [],
      colorControls: {
        _class: 'colorControls',
        brightness: 0,
        contrast: 1,
        hue: 0,
        isEnabled: false,
        saturation: 1,
      },
      contextSettings: {
        _class: 'graphicsContextSettings',
        blendMode: 0,
        opacity: 1,
      },
      do_objectID: 'UUID',
      endMarkerType: 0,
      fills: [],
      innerShadows: [],
      miterLimit: 10,
      shadows: [],
      startMarkerType: 0,
      windingRule: 1,
    });
  });
});
