import { Gradient } from '../../src/styles';

describe('Gradient 类', () => {
  describe('初始化', () => {
    it('无参数', () => {
      const gradient = new Gradient();
      expect(gradient).toBeInstanceOf(Gradient);
      expect(JSON.parse(JSON.stringify(gradient.toJSON()))).toEqual({
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
              b: 255,
              g: 255,
              r: 255,
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
    it('满参数', () => {
      const gradient = new Gradient({
        from: { x: 1, y: 0 },
        to: { x: 0, y: 1 },
        type: 'LINEAR',
        stops: ['red', 'green'],
      });
      expect(gradient.from).toEqual({ x: 1, y: 0 });
      expect(gradient.to).toEqual({ x: 0, y: 1 });
      expect(gradient.type).toEqual('LINEAR');
      expect(gradient.stops).toHaveLength(2);
    });
    it('部分参数', () => {
      const gradient = new Gradient({});
      expect(gradient.from).toEqual({ x: 0.5, y: 0 });
      expect(gradient.to).toEqual({ x: 0.5, y: 1 });
      expect(gradient.type).toEqual('LINEAR');
      expect(gradient.stops).toHaveLength(2);
    });
  });
  describe('线性渐变', () => {
    it('双色渐变', () => {
      const gradient = new Gradient({
        stops: [
          { color: 'yellow', position: 0 },
          { color: 'red', position: 0.4 },
        ],
      });
      expect(gradient.stops.length).toBe(2);
      expect(gradient.toJSON().stops).toStrictEqual([
        {
          color: {
            a: 1,
            b: 0,
            g: 255,
            r: 255,
          },
          position: 0,
        },
        {
          color: {
            a: 1,
            b: 0,
            g: 0,
            r: 255,
          },
          position: 0.4,
        },
      ]);
    });
    it('三色渐变', () => {
      const gradient = new Gradient({ stops: ['yellow', 'red', 'green'] });
      expect(gradient.stops.length).toBe(3);
      expect(gradient.toJSON().stops).toStrictEqual([
        {
          color: {
            a: 1,
            b: 0,
            g: 255,
            r: 255,
          },
          position: 0,
        },
        {
          color: {
            a: 1,
            b: 0,
            g: 0,
            r: 255,
          },
          position: 0.5,
        },
        {
          color: {
            a: 1,
            b: 0,
            g: 128,
            r: 0,
          },
          position: 1,
        },
      ]);
    });
  });
  describe('圆形渐变', () => {
    it('满参数', () => {
      const gradient = new Gradient({
        type: 'RADIAL',
        radius: 0.5,
        stops: ['red'],
      });
      expect(gradient.type).toEqual('RADIAL');
      expect(gradient.radius).toEqual(0.5);
    });
  });

  it('toParams', () => {
    const gradient = new Gradient({ stops: ['yellow', 'red', 'green'] });
    expect(JSON.parse(JSON.stringify(gradient.toParams()))).toStrictEqual({
      from: {
        x: 0.5,
        y: 0,
      },
      stops: [
        {
          color: {
            a: 1,
            b: 0,
            g: 255,
            r: 255,
          },
          position: 0,
        },
        {
          color: {
            a: 1,
            b: 0,
            g: 0,
            r: 255,
          },
          position: 0.5,
        },
        {
          color: {
            a: 1,
            b: 0,
            g: 128,
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
