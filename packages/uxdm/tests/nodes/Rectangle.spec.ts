import { RectangleNode } from 'uxdm';
import { RectangleNodeType } from '@uxdm/schema';

describe('Rectangle 类', () => {
  it('无参数', () => {
    const rectangle = new RectangleNode();
    expect(rectangle.id).toBe('id');
    expect(rectangle.name).toBe('rectangle');
    expect(rectangle.cornerRadius).toBe(0);
    expect(rectangle.locked).toBe(false);
    expect(rectangle.visible).toBe(true);
  });

  it('满参数', () => {
    const rectangle = new RectangleNode({
      cornerRadius: 10,
      id: '234',
      name: 'test',
      locked: true,
      visible: false,
    });
    expect(rectangle.id).toBe('234');
    expect(rectangle.name).toBe('test');
    expect(rectangle.cornerRadius).toBe(10);
    expect(rectangle.locked).toBe(true);
    expect(rectangle.visible).toBe(false);
  });

  it('缺参数', () => {
    const rectangle = new RectangleNode({});
    expect(rectangle.id).toBe('id');
    expect(rectangle.name).toBe('rectangle');
    expect(rectangle.cornerRadius).toBe(0);
    expect(rectangle.locked).toBe(false);
    expect(rectangle.visible).toBe(true);
  });

  it('toJSON', () => {
    const json: RectangleNodeType = {
      cornerRadius: 0,
      id: 'id',
      layout: {
        constraints: {
          horizontal: 'MIN',
          vertical: 'MIN',
        },
        id: 'id',
      },
      locked: false,
      name: 'rectangle',
      type: 'RECTANGLE',
      visible: true,
      bounding: { rotation: 0, height: 0, width: 0, y: 0, x: 0 },
    };
    const rectangle = new RectangleNode();
    expect(JSON.parse(JSON.stringify(rectangle.toJSON()))).toStrictEqual(json);
  });
  it('clone', () => {
    const rectangle = new RectangleNode({ cornerRadius: 10 });
    const newRect = rectangle.clone();
    expect(newRect.cornerRadius).toEqual(10);
    expect(newRect).toBeInstanceOf(RectangleNode);
  });

  describe('Bounding 透出的 get 和 set 属性', () => {
    const rectangleNode = new RectangleNode({
      x: 5,
      y: 10,
      width: 15,
      height: 20,
      rotation: 3,
    });
    it('X 轴', () => {
      expect(rectangleNode.left).toEqual(5);
      expect(rectangleNode.right).toEqual(20);
      expect(rectangleNode.centerX).toEqual(12.5);

      rectangleNode.centerX = 17.5;
      expect(rectangleNode.x).toEqual(10);
      rectangleNode.centerX = 12.5;

      rectangleNode.left = 20;
      expect(rectangleNode.x).toEqual(20);
      rectangleNode.left = 5;

      rectangleNode.right = 25;
      expect(rectangleNode.x).toEqual(10);
      rectangleNode.right = 20;
    });

    it('Y 轴', () => {
      expect(rectangleNode.top).toEqual(10);
      expect(rectangleNode.bottom).toEqual(30);
      expect(rectangleNode.centerY).toEqual(20);

      rectangleNode.centerY = 40;
      expect(rectangleNode.y).toEqual(30);
      rectangleNode.centerY = 20;

      rectangleNode.top = 20;
      expect(rectangleNode.y).toEqual(20);
      rectangleNode.top = 10;

      rectangleNode.bottom = 40;
      expect(rectangleNode.y).toEqual(20);
      rectangleNode.bottom = 30;
    });
    it('旋转', () => {
      expect(rectangleNode.rotation).toBe(3);
      rectangleNode.rotation = 10;
      expect(rectangleNode.rotation).toBe(10);
      rectangleNode.rotation = 0;
    });
  });
  //   it('蒙版正常', () => {
  //     const rect = new Rectangle({ height: 100, width: 50, x: 280, y: 100 });
  //     rect.hasClippingMask = true;
  //
  //     const json = rect.toSketchJSON();
  //     expect(json.hasClippingMask).toBeTruthy();
  //   });
  // });
});
