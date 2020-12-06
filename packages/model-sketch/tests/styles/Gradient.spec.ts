import { Gradient } from '@uxdm/model-sketch/styles';
import { SketchFormat } from '@uxdm/model-sketch';

describe('Gradient 类', () => {
  describe('线性渐变', () => {
    it('三色渐变', () => {
      const gradient = new Gradient({ stops: ['yellow', 'red', 'green'] });
      expect(gradient.stops.length).toBe(3);
      expect(gradient.toSketchJSON().stops).toStrictEqual([
        {
          _class: 'gradientStop',
          color: {
            _class: 'color',
            alpha: 1,
            blue: 0,
            green: 1,
            red: 1,
          },
          position: 0,
        },
        {
          _class: 'gradientStop',
          color: {
            _class: 'color',
            alpha: 1,
            blue: 0,
            green: 0,
            red: 1,
          },
          position: 0.5,
        },
        {
          _class: 'gradientStop',
          color: {
            _class: 'color',
            alpha: 1,
            blue: 0,
            green: 0.5019607843137255,
            red: 0,
          },
          position: 1,
        },
      ]);
    });
  });

  it('渐变类型', () => {
    const gradient = new Gradient();
    expect(gradient.sketchGradientType).toEqual(0);
    gradient.type = 'RADIAL';
    expect(gradient.sketchGradientType).toEqual(1);
    gradient.type = 'ANGULAR';
    expect(gradient.sketchGradientType).toEqual(2);
  });

  describe('fromSketchJSON', () => {
    it('should ', () => {
      const input: SketchFormat.Gradient = {
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
      };
      const gradient = Gradient.fromSketchJSON(input);
      expect(gradient.type).toEqual('LINEAR');
      expect(gradient.toJSON()).toEqual({
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
      });
    });
  });
  describe('fromSketchPoint', () => {
    it('{0.1, 0.3}', () => {
      expect(Gradient.fromSketchPoint('{0.1, 0.3}')).toEqual({
        x: 0.1,
        y: 0.3,
      });
    });
    it('{0.1, 0.3', () => {
      expect(Gradient.fromSketchPoint('{0.1, 0.3')).toEqual({
        x: 0,
        y: 0,
      });
    });
  });
});
