import { Bounding, BoundingParams, BoundingType } from 'uxdm';

describe('Bounding', () => {
  it('无参数', () => {
    const bounding = new Bounding();
    expect(bounding.x).toBe(0);
    expect(bounding.y).toBe(0);
    expect(bounding.width).toBe(0);
    expect(bounding.height).toBe(0);
    expect(bounding.rotation).toBe(0);
  });
  it('满参数 ', () => {
    const bounding = new Bounding({
      x: 1,
      y: 2,
      width: 3,
      height: 4,
      rotation: 10,
    });
    expect(bounding.x).toBe(1);
    expect(bounding.y).toBe(2);
    expect(bounding.width).toBe(3);
    expect(bounding.height).toBe(4);
    expect(bounding.rotation).toBe(10);
  });
  it('缺参数 ', () => {
    const bounding = new Bounding({});
    expect(bounding.x).toBe(0);
    expect(bounding.y).toBe(0);
    expect(bounding.width).toBe(0);
    expect(bounding.height).toBe(0);
    expect(bounding.rotation).toBe(0);
  });

  describe('方法属性', () => {
    const bounding = new Bounding({
      x: 5,
      y: 10,
      width: 15,
      height: 20,
    });
    it('X 轴', () => {
      expect(bounding.left).toEqual(5);
      expect(bounding.right).toEqual(20);
      expect(bounding.centerX).toEqual(12.5);

      bounding.centerX = 17.5;
      expect(bounding.x).toEqual(10);
      bounding.centerX = 12.5;

      bounding.left = 20;
      expect(bounding.x).toEqual(20);
      bounding.left = 5;

      bounding.right = 25;
      expect(bounding.x).toEqual(10);
      bounding.right = 20;
    });
    it('Y 轴', () => {
      expect(bounding.top).toEqual(10);
      expect(bounding.bottom).toEqual(30);
      expect(bounding.centerY).toEqual(20);

      bounding.centerY = 40;
      expect(bounding.y).toEqual(30);
      bounding.centerY = 20;

      bounding.top = 20;
      expect(bounding.y).toEqual(20);
      bounding.top = 10;

      bounding.bottom = 40;
      expect(bounding.y).toEqual(20);
      bounding.bottom = 30;
    });

    it('scale', () => {
      bounding.scale(2);
      expect(bounding.width).toEqual(30);
      expect(bounding.height).toEqual(40);
      bounding.scale(0.5);
    });

    it('offset', () => {
      bounding.offset(5, 10);
      expect(bounding.x).toEqual(10);
      expect(bounding.y).toEqual(20);
      bounding.offset(-5, -10);
    });

    it('toJSON', () => {
      const json: BoundingType = {
        x: 5,
        y: 10,
        height: 20,
        width: 15,
        rotation: 0,
      };
      expect(bounding.toJSON()).toStrictEqual(json);
    });

    it('from JSON', () => {
      const json: BoundingType = {
        x: 5,
        y: 10,
        height: 20,
        width: 15,
        rotation: 0,
      };

      expect(Bounding.fromJSON(json)).toBeInstanceOf(Bounding);
    });

    describe('toParams', () => {
      it('无参数', () => {
        const group = new Bounding();
        expect(group.toParams()).toBeUndefined();
      });
      it('空参数', () => {
        const group = new Bounding({});
        expect(group.toParams()).toBeUndefined();
      });
      it('带有参数', () => {
        const params: BoundingParams = {
          height: 100,
          width: 100,
          x: 10,
          y: 20,
          rotation: 30,
        };
        const group = new Bounding(params);
        expect(group.toParams()).toEqual(params);
      });
    });
  });
});
