import { Fill } from '@uxdm/model-sketch/styles';

describe('Fill 类', () => {
  it('toSketchJSON', () => {
    const fill = new Fill();
    expect(fill.toSketchJSON()).toEqual({
      _class: 'fill',
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
      fillType: 0,
      gradient: {
        _class: 'gradient',
        from: '{0.5, 0}',
        gradientType: 0,
        stops: [
          {
            _class: 'gradientStop',
            color: {
              _class: 'color',
              alpha: 1,
              blue: 0,
              green: 0,
              red: 0,
            },
            position: 0,
          },
          {
            _class: 'gradientStop',
            color: {
              _class: 'color',
              alpha: 1,
              blue: 1,
              green: 1,
              red: 1,
            },
            position: 1,
          },
        ],
        to: '{0.5, 1}',
      },
      isEnabled: true,
      noiseIndex: 0,
      noiseIntensity: 0,
      patternFillType: 1,
      patternTileScale: 1,
    });
  });
});
