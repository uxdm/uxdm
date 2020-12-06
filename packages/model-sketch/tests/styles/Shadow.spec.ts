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

  describe('fromSketchJSON', () => {
    it('内阴影', () => {
      const json: SketchFormat.InnerShadow = {
        _class: 'innerShadow',
        isEnabled: false,
        blurRadius: 8,
        offsetX: 0,
        offsetY: 5,
        spread: 12,
        color: {
          _class: 'color',
          alpha: 0.5,
          blue: 0.6706012228260869,
          green: 0.1650946608024589,
          red: 0.3087320968320091,
        },
        contextSettings: {
          _class: 'graphicsContextSettings',
          blendMode: 0,
          opacity: 1,
        },
      };

      const shadow = Shadow.fromSketchJSON(json);
      expect(shadow.toJSON()).toEqual({
        blendMode: 'NORMAL',
        blur: 8,
        color: {
          a: 0.5,
          r: 79,
          g: 42,
          b: 171,
        },
        id: 'nanoid',
        offset: {
          x: 0,
          y: 5,
        },
        spread: 12,
        type: 'INNER_SHADOW',
        visible: false,
      });
    });

    it('外阴影', () => {
      const json: SketchFormat.Shadow = {
        _class: 'shadow',
        isEnabled: true,
        blurRadius: 4,
        offsetX: 0,
        offsetY: 2,
        spread: 0,
        color: {
          _class: 'color',
          alpha: 0.5,
          blue: 0,
          green: 0,
          red: 0,
        },
        contextSettings: {
          _class: 'graphicsContextSettings',
          blendMode: 9,
          opacity: 1,
        },
      };
      const shadow = Shadow.fromSketchJSON(json);
      expect(shadow.toJSON()).toEqual({
        blendMode: 'HARD_LIGHT',
        blur: 4,
        color: {
          a: 0.5,
          b: 0,
          g: 0,
          r: 0,
        },
        id: 'nanoid',
        offset: {
          x: 0,
          y: 2,
        },
        spread: 0,
        type: 'SHADOW',
        visible: true,
      });
    });
  });
});
