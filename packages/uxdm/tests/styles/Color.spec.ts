import { Color } from '../../src/styles';

describe('Color 类', () => {
  describe('正常创建', () => {
    it('初始化颜色为黑色', () => {
      const color = new Color();

      expect(color.hex).toBe('#000000');
    });
    it('支持数组', () => {
      const color = new Color([20, 30, 40]);

      expect(color.rgba).toBe('rgba(20,30,40,1)');
    });
    it('支持 rgba', () => {
      const color = new Color('rgb(100,200 ,200) 10%');
      expect(color.rgba).toBe('rgba(100,200,200,0.1)');
      const color2 = new Color('rgb(242, 242, 242) 25%');
      expect(color2.rgba).toBe('rgba(242,242,242,0.25)');
    });
    it('支持 rgb', () => {
      const color = new Color('rgb(2,4,91)');
      expect(color.toJSON()).toEqual({
        r: 2,
        g: 4,
        b: 91,
        a: 1,
      });
      const param = color.toParams();
      expect(new Color(param).rgba).toEqual('rgba(2,4,91,1)');
    });
    it('支持入参为对象', () => {
      const color = new Color({
        r: 12,
        g: 32,
        b: 35,
        // @ts-ignore
        re: 12321,
      });
      expect(color.hex).toEqual('#0C2023');

      const color2 = new Color({
        r: 12,
        b: 35,
        a: 0.3,
        // @ts-ignore
        xxx: '23',
      });
      expect(color2.rgba).toEqual('rgba(12,0,35,0.3)');

      const color3 = new Color({});
      expect(color3.hex).toBe('#000000');
    });
  });
  describe('get方法正常', () => {
    const inputColor = 'rgba(50,50,10,0.5)';
    const color = new Color(inputColor);
    it('rgb', () => {
      expect(color.rgb).toEqual('rgb(50,50,10)');
    });
    it('rgba', () => {
      expect(color.rgba).toBe('rgba(50,50,10,0.5)');
    });
    it('alpha', () => {
      expect(color.alpha).toBe(0.5);
    });
    it('red', () => {
      expect(color.red).toBe(50);
    });
    it('green', () => {
      expect(color.green).toBe(50);
    });
    it('blue', () => {
      expect(color.blue).toBe(10);
    });
    it('hue', () => {
      expect(color.hue).toBe(60);
    });
    it('saturation', () => {
      expect(color.saturation).toBe(80);
    });
    it('brightness', () => {
      expect(color.brightness).toBe(19.607843137254903);
    });
    it('b', () => {
      expect(color.b).toBe(23.983300680602255);
    });
    it('l', () => {
      expect(color.l).toBe(19.968562554120787);
    });
    it('lightness', () => {
      expect(color.lightness).toBe(11.76470588235294);
    });
    it('value', () => {
      expect(color.value).toBe(19.607843137254903);
    });
    it('saturationl', () => {
      expect(color.saturationl).toBe(66.66666666666666);
    });
    it('s', () => {
      expect(color.s).toBe(80);
    });
    it('saturationv', () => {
      expect(color.saturationv).toBe(80);
    });
  });
  describe('set 方法正常', () => {
    const color = new Color('#1cd432');
    it('red', () => {
      expect(color.red).toEqual(28);
      expect(color.green).toEqual(212);
      expect(color.blue).toEqual(50);
      color.red = 10;
      expect(color.red).toEqual(10);
      expect(color.green).toEqual(212);
      expect(color.blue).toEqual(50);
      color.red = 28;
    });
    it('blue', () => {
      expect(color.red).toEqual(28);
      expect(color.green).toEqual(212);
      expect(color.blue).toEqual(50);
      color.blue = 10;
      expect(color.blue).toEqual(10);
      expect(color.green).toEqual(212);
      expect(color.red).toEqual(28);
      color.blue = 50;
    });
    it('green', () => {
      expect(color.red).toEqual(28);
      expect(color.green).toEqual(212);
      expect(color.blue).toEqual(50);
      color.green = 10;
      expect(color.green).toEqual(10);
      expect(color.blue).toEqual(50);
      expect(color.red).toEqual(28);
      color.green = 212;
    });
    it('alpha', () => {
      expect(color.alpha).toEqual(1);
      color.alpha = 0.5;
      expect(color.alpha).toEqual(0.5);
      color.alpha = 1;
    });
  });
  describe('toJSON', () => {
    it('正常解析', () => {
      const color = new Color('rgb(50,50,10)');
      expect(color.toJSON()).toStrictEqual({
        r: 50,
        g: 50,
        b: 10,
        a: 1,
      });
    });
  });

  it('toParams', () => {
    const color = new Color('rgba(24,78,34,0.2)');
    expect(color.toParams()).toEqual({
      a: 0.2,
      b: 34,
      g: 78,
      r: 24,
    });
    const params = color.toParams();
    expect(new Color(params).rgba).toEqual('rgba(24,78,34,0.2)');
  });
});
