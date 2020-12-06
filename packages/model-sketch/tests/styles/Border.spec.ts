import { SketchFormat } from '@uxdm/model-sketch';
import { Border } from '@uxdm/model-sketch/styles';

describe('Border 类', () => {
  it('toSketchJSON', () => {
    const borderOptions = new Border();
    expect(borderOptions.toSketchJSON()).toEqual({
      _class: 'border',
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
      position: 1,
      thickness: 1,
    });
  });
  it('sketchPosition', () => {
    const border = new Border({ align: 'CENTER' });
    expect(border.sketchPosition).toEqual(0);
    border.align = 'OUTSIDE';
    expect(border.sketchPosition).toEqual(2);
    // @ts-ignore
    border.align = '';
    expect(border.sketchPosition).toEqual(1);
  });

  it('fromSketchJSON', () => {
    const json: SketchFormat.Border = {
      _class: 'border',
      isEnabled: false,
      fillType: 0,
      color: {
        _class: 'color',
        alpha: 1,
        blue: 0.592,
        green: 0.592,
        red: 0.592,
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
      position: 1,
      thickness: 1,
    };
    const border = Border.fromSketchJSON(json);
    expect(border.toJSON()).toEqual({
      align: 'INSIDE',
      blendMode: 'NORMAL',
      color: {
        a: 1,
        b: 151,
        g: 151,
        r: 151,
      },
      dashPattern: [],
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
      lineCap: 'NONE',
      lineJoin: 'MITER',
      name: '#979797',
      opacity: 1,
      position: 'FULL',
      thickness: 1,
      type: 'SOLID',
      visible: false,
    });
  });
});
