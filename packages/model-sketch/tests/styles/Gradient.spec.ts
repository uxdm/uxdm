import { Gradient } from '../../src/styles';

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
    expect(gradient.gradientType).toEqual(0);
    gradient.type = 'RADIAL';
    expect(gradient.gradientType).toEqual(1);
    gradient.type = 'ANGULAR';
    expect(gradient.gradientType).toEqual(2);
  });
});
