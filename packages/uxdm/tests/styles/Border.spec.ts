import { Border } from '../../src/styles';
import { defaultColorStops } from './defaultValue';

describe('Border 类', () => {
  it('无参数', () => {
    const border = new Border();
    expect(JSON.parse(JSON.stringify(border.toJSON()))).toEqual({
      visible: true,
      align: 'INSIDE',
      color: {
        a: 1,
        b: 0,
        g: 0,
        hex: '#000000',
        r: 0,
      },
      dashPattern: [],
      gradient: {
        from: {
          x: 0.5,
          y: 0,
        },
        radius: 1,
        stops: defaultColorStops,
        to: {
          x: 0.5,
          y: 1,
        },
        type: 'LINEAR',
      },
      id: 'id',
      lineCap: 'NONE',
      lineJoin: 'MITER',
      name: 'Fill',
      opacity: 1,
      position: 'FULL',
      thickness: 1,
      type: 'SOLID',
    });
  });
  it('满参数', () => {
    const border = new Border({
      align: 'OUTSIDE',
      lineJoin: 'ROUND',
      lineCap: 'SQUARE',
      dashPattern: [2, 4],
      position: 'BOTTOM',
      thickness: 24,
      color: 'rgba(34,36,68,0.3)',
      type: 'SOLID',
    });
    expect(JSON.parse(JSON.stringify(border.toJSON()))).toEqual({
      visible: true,
      align: 'OUTSIDE',
      color: {
        a: 0.3,
        b: 68,
        g: 36,
        hex: '#222444',
        r: 34,
      },
      dashPattern: [2, 4],
      gradient: {
        from: {
          x: 0.5,
          y: 0,
        },
        radius: 1,
        stops: defaultColorStops,
        to: {
          x: 0.5,
          y: 1,
        },
        type: 'LINEAR',
      },
      id: 'id',
      lineJoin: 'ROUND',
      lineCap: 'SQUARE',
      name: '#222444',
      opacity: 0.3,
      position: 'BOTTOM',
      thickness: 24,
      type: 'SOLID',
    });
  });
  it('部分参数', () => {
    const border = new Border({});
    expect(JSON.parse(JSON.stringify(border.toJSON()))).toEqual({
      visible: true,
      align: 'INSIDE',
      color: {
        a: 1,
        b: 0,
        g: 0,
        hex: '#000000',
        r: 0,
      },
      dashPattern: [],
      gradient: {
        from: {
          x: 0.5,
          y: 0,
        },
        radius: 1,
        stops: defaultColorStops,
        to: {
          x: 0.5,
          y: 1,
        },
        type: 'LINEAR',
      },
      id: 'id',
      lineCap: 'NONE',
      lineJoin: 'MITER',
      name: '#000000',
      opacity: 1,
      position: 'FULL',
      thickness: 1,
      type: 'SOLID',
    });
  });
});
