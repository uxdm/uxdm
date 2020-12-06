import { Fill } from '@uxdm/model-sketch/styles';
import { SketchFormat } from '@uxdm/model-sketch';

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

  it('should fromSketchJSON', () => {
    const json: SketchFormat.Fill = {
      _class: 'fill',
      isEnabled: true,
      fillType: 0,
      color: {
        _class: 'color',
        alpha: 1,
        blue: 0.6528221187004988,
        green: 0.6528221187004988,
        red: 0.7786741394927537,
      },
      contextSettings: {
        _class: 'graphicsContextSettings',
        blendMode: 0,
        opacity: 1,
      },
      gradient: {
        _class: 'gradient',
        elipseLength: 0,
        from: '{0.5, 0}',
        gradientType: 0,
        to: '{0.5, 1}',
        stops: [
          {
            _class: 'gradientStop',
            position: 0,
            color: {
              _class: 'color',
              alpha: 1,
              blue: 1,
              green: 1,
              red: 1,
            },
          },
          {
            _class: 'gradientStop',
            position: 1,
            color: {
              _class: 'color',
              alpha: 1,
              blue: 0,
              green: 0,
              red: 0,
            },
          },
        ],
      },
      noiseIndex: 0,
      noiseIntensity: 0,
      patternFillType: 1,
      patternTileScale: 1,
    };
    const fill = Fill.fromSketchJSON(json);
    expect(fill.toJSON()).toEqual({
      blendMode: 'NORMAL',
      color: {
        a: 1,
        b: 166,
        g: 166,
        r: 199,
      },
      gradient: {
        from: {
          x: 0.5,
          y: 0,
        },
        stops: [
          {
            color: {
              a: 1,
              b: 0,
              g: 0,
              r: 0,
            },
            position: 0,
          },
          {
            color: {
              a: 1,
              b: 0,
              g: 0,
              r: 0,
            },
            position: 1,
          },
        ],
        to: {
          x: 0.5,
          y: 1,
        },
        type: 'LINEAR',
      },
      id: 'nanoid',
      name: '#C7A6A6',
      opacity: 1,
      type: 'SOLID',
      visible: true,
    });
  });
});
