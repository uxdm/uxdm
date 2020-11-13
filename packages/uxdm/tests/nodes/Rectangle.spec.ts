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

  //   it('蒙版正常', () => {
  //     const rect = new Rectangle({ height: 100, width: 50, x: 280, y: 100 });
  //     rect.hasClippingMask = true;
  //
  //     const json = rect.toSketchJSON();
  //     expect(json.hasClippingMask).toBeTruthy();
  //   });
  // });
});
