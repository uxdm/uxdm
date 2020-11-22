import { Shadow, ShadowType } from 'uxdm';

describe('Shadow 类', () => {
  it('无参数', () => {
    const shadow = new Shadow();
    expect(shadow.type).toEqual('SHADOW');
    expect(shadow.toJSON()).toEqual({
      blendMode: 'NORMAL',
      color: {
        a: 1,
        b: 0,
        g: 0,
        r: 0,
      },
      id: 'id',
      offset: {
        x: 0,
        y: 0,
      },
      blur: 0,
      spread: 0,
      type: 'SHADOW',
      visible: false,
    });
  });
  it('满参数', () => {
    const shadow = new Shadow({
      type: 'INNER_SHADOW',
      color: 'red',
      spread: 10,
      blur: 5,
      visible: false,
      offsetY: 2,
      offsetX: 8,
      blendMode: 'DARKEN',
    });
    expect(shadow.offsetX).toEqual(8);
    expect(shadow.offsetY).toEqual(2);
    expect(shadow.toJSON()).toEqual({
      blendMode: 'DARKEN',
      color: {
        a: 1,
        b: 0,
        g: 0,
        r: 255,
      },
      id: 'id',
      offset: {
        x: 8,
        y: 2,
      },
      blur: 5,
      spread: 10,
      type: 'INNER_SHADOW',
      visible: false,
    });
  });
  it('部分参数', () => {
    const shadow = new Shadow({ type: 'INNER_SHADOW' });
    expect(shadow.toJSON()).toEqual({
      blendMode: 'NORMAL',
      color: {
        a: 1,
        b: 0,
        g: 0,
        r: 0,
      },
      id: 'id',
      offset: {
        x: 0,
        y: 0,
      },
      blur: 0,
      spread: 0,
      type: 'INNER_SHADOW',
      visible: false,
    });
  });

  it('opacity', () => {
    const shadow = new Shadow();
    expect(shadow.opacity).toEqual(1);
    shadow.opacity = 0.4;
    expect(shadow.opacity).toEqual(0.4);
  });

  it('toParams', () => {
    const shadow = new Shadow({
      type: 'INNER_SHADOW',
      color: 'red',
      spread: 10,
      blur: 5,
      visible: false,
      offsetY: 2,
      offsetX: 8,
      blendMode: 'DARKEN',
    });
    expect(shadow.toParams()).toEqual({
      blendMode: 'DARKEN',
      color: {
        a: 1,
        b: 0,
        g: 0,
        r: 255,
      },
      offsetY: 2,
      offsetX: 8,
      blur: 5,
      spread: 10,
      type: 'INNER_SHADOW',
      visible: false,
    });
  });
  describe('fromJSON', () => {
    it('单个阴影', () => {
      const json: ShadowType = {
        blendMode: 'DARKEN',
        color: {
          a: 1,
          b: 0,
          g: 0,
          r: 255,
        },
        id: '123',
        offset: {
          x: 8,
          y: 2,
        },
        blur: 5,
        spread: 10,
        type: 'INNER_SHADOW',
        visible: false,
      };

      const shadow = Shadow.fromJSON(json);
      expect(shadow).toBeInstanceOf(Shadow);
      expect((shadow as Shadow).toJSON()).toEqual(json);
    });

    it('多个阴影 ', () => {
      const json: ShadowType[] = [
        {
          blendMode: 'DARKEN',
          color: {
            a: 1,
            b: 0,
            g: 0,
            r: 255,
          },
          id: '123',
          offset: {
            x: 8,
            y: 2,
          },
          blur: 5,
          spread: 10,
          type: 'INNER_SHADOW',
          visible: false,
        },
        {
          blendMode: 'DARKEN',
          color: {
            a: 1,
            b: 0,
            g: 0,
            r: 255,
          },
          id: '123',
          offset: {
            x: 8,
            y: 2,
          },
          blur: 40,
          spread: 10,
          type: 'INNER_SHADOW',
          visible: false,
        },
      ];
      const shadow = Shadow.fromJSON(json);
      expect(shadow).toBeInstanceOf(Array);
    });
  });
});
