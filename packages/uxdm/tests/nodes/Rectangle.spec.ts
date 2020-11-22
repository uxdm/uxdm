import { Fill, RectangleNode, RectangleNodeType } from 'uxdm';

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

  describe('函数方法', () => {
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
          selfFlexboxAlign: 'AUTO',
          selfFlexboxGrow: 0,
          selfFlexboxOrder: 0,
          selfFlexboxShrink: 0,
          selfLayoutMode: 'AUTO',
        },
        locked: false,
        name: 'rectangle',
        type: 'Rectangle',
        visible: true,
        bounding: { rotation: 0, height: 0, width: 0, y: 0, x: 0 },
        style: {
          blendMode: 'NORMAL',
          borderOptions: {
            align: 'INSIDE',
            dashPattern: [],
            enabled: true,
            lineCap: 'NONE',
            lineJoin: 'MITER',
          },
          borders: [],
          fills: [],
          id: 'id',
          innerShadows: [],
          opacity: 1,
          shadows: [],
        },
      };
      const rectangle = new RectangleNode();
      expect(JSON.parse(JSON.stringify(rectangle.toJSON()))).toStrictEqual(
        json,
      );
    });
    it('clone', () => {
      const rectangle = new RectangleNode({ cornerRadius: 10 });
      const newRect = rectangle.clone();
      expect(newRect.cornerRadius).toEqual(10);
      expect(newRect).toBeInstanceOf(RectangleNode);
    });
    it('fromJSON', () => {
      const json: RectangleNodeType = {
        id: 'NGEUz3P1pc',
        type: 'Rectangle',
        locked: false,
        name: 'rectangle',
        visible: true,
        layout: {
          id: 'xMcLa3kMXn',
          constraints: {
            horizontal: 'MIN',
            vertical: 'MIN',
          },
          selfFlexboxAlign: 'AUTO',
          selfFlexboxGrow: 0,
          selfFlexboxOrder: 0,
          selfFlexboxShrink: 0,
          selfLayoutMode: 'AUTO',
        },
        bounding: {
          height: 100,
          width: 200,
          x: 182,
          y: 121,
          rotation: 0,
        },
        style: {
          id: '8KmesdV9qe',
          fills: [
            {
              id: '9KxJmVZHHt',
              type: 'SOLID',
              name: '#000000',
              color: {
                r: 0,
                g: 0,
                b: 0,
                a: 1,
              },
              gradient: {
                type: 'LINEAR',
                from: {
                  x: 0.5,
                  y: 0,
                },
                to: {
                  x: 0.5,
                  y: 1,
                },
                stops: [
                  {
                    position: 0,
                    color: {
                      r: 0,
                      g: 0,
                      b: 0,
                      a: 1,
                    },
                  },
                  {
                    position: 1,
                    color: {
                      r: 255,
                      g: 255,
                      b: 255,
                      a: 1,
                    },
                  },
                ],
              },
              opacity: 1,
              blendMode: 'NORMAL',
              visible: true,
            },
          ],
          borderOptions: {
            align: 'INSIDE',
            lineJoin: 'MITER',
            lineCap: 'NONE',
            dashPattern: [],
            enabled: true,
          },
          innerShadows: [],
          shadows: [],
          borders: [],
          opacity: 1,
          blendMode: 'NORMAL',
        },
        cornerRadius: 0,
      };
      expect(RectangleNode.fromJSON(json).toJSON()).toEqual(json);
    });
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
    it('设置坐标', () => {
      expect(rectangleNode.position).toEqual({ x: 5, y: 10 });
      rectangleNode.setPosition({ x: 300, y: 400 });
      expect(rectangleNode.position).toEqual({ x: 300, y: 400 });
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

  describe('入参接口设计', () => {
    const rect = new RectangleNode({ fill: '#123fa3' });
    it('支持使用 fill 作为参数 初始化带某个颜色的矩形', () => {
      expect(rect.style.fills).toHaveLength(1);
      expect(rect.style.fills[0].color.hex).toBe('#123FA3');
    });
    it('允许直接使用 fill 参数获取当前参数', () => {
      expect((rect.fill as Fill)?.color.hex).toBe('#123FA3');
    });
  });
});
