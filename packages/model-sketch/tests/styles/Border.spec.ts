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
});
