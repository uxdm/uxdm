import { Fill, FillType } from 'uxdm';
import { defaultColorStops } from './defaultValue';

describe('Fill 类', () => {
  it('无参数', () => {
    const fill = new Fill();
    expect(JSON.parse(JSON.stringify(fill.toJSON()))).toEqual({
      blendMode: 'NORMAL',
      visible: true,

      color: {
        a: 1,
        b: 0,
        g: 0,
        r: 0,
      },
      gradient: {
        from: {
          x: 0.5,
          y: 0,
        },
        stops: defaultColorStops,
        to: {
          x: 0.5,
          y: 1,
        },
        type: 'LINEAR',
      },
      id: 'id',
      name: 'Fill',
      opacity: 1,
      type: 'SOLID',
    });
  });

  it('toParams', () => {
    const border = new Fill({
      color: 'rgba(34,36,68,0.3)',
      type: 'SOLID',
      visible: false,
    });
    expect(JSON.parse(JSON.stringify(border.toParams()))).toEqual({
      blendMode: 'NORMAL',
      visible: false,

      color: {
        a: 0.3,
        b: 68,
        g: 36,
        r: 34,
      },
      gradient: {
        from: {
          x: 0.5,
          y: 0,
        },
        stops: defaultColorStops,
        to: {
          x: 0.5,
          y: 1,
        },
        type: 'LINEAR',
      },
      opacity: 0.3,
      type: 'SOLID',
    });
  });
  it('fromJSON', () => {
    const json: FillType = {
      blendMode: 'NORMAL',
      visible: true,
      color: {
        a: 1,
        b: 0,
        g: 0,
        r: 0,
      },
      gradient: {
        from: {
          x: 0.5,
          y: 0,
        },
        stops: defaultColorStops,
        to: {
          x: 0.5,
          y: 1,
        },
        type: 'LINEAR',
      },
      id: 'dsf',
      name: 'wer',
      opacity: 1,
      type: 'SOLID',
    };
    expect(Fill.fromJSON(json).toJSON()).toEqual(json);
  });
});
