import { CircleNode, CircleNodeType } from 'uxdm';

describe('CircleNode', () => {
  it('正常创建', () => {
    const circle = new CircleNode({ x: 0, y: 50, radius: 100 });

    expect(circle.x).toBe(0);
    expect(circle.y).toBe(50);
    expect(circle.right).toBe(200);
    expect(circle.left).toBe(0);
    expect(circle.width).toBe(200);
    expect(circle.height).toBe(200);
    expect(circle.top).toBe(50);
    expect(circle.bottom).toBe(250);

    expect(circle.cx).toBe(100);
    expect(circle.cy).toBe(150);
    expect(circle.radius).toBe(100);
  });

  it('以 x y radius 创建', () => {
    const circle = new CircleNode({
      x: 100,
      y: 100,
      radius: 100,
    });
    expect(circle.x).toBe(100);
    expect(circle.y).toBe(100);
    expect(circle.radius).toBe(100);
  });
  it('以 rx ry radius 创建', () => {
    const circle = new CircleNode({
      cx: 100,
      cy: 100,
      radius: 25,
    });
    expect(circle.cx).toBe(100);
    expect(circle.cy).toBe(100);
    expect(circle.radius).toBe(25);
  });
  it('修改 radius 正常响应', () => {
    const circle = new CircleNode({ x: 0, y: 50, radius: 100 });

    expect(circle.cx).toBe(100);
    circle.radius = 50;
    expect(circle.width).toBe(100);
    expect(circle.left).toBe(0);
    expect(circle.right).toBe(100);
    expect(circle.cx).toBe(50);
    expect(circle.radius).toBe(50);
    expect(circle.left).toBe(0);
    expect(circle.right).toBe(100);
  });

  it('fromJSON', () => {
    const json: CircleNodeType = {
      id: 'khztUxWhU1',
      type: 'Circle',
      locked: false,
      name: 'circle',
      visible: true,
      layout: {
        id: 'ORkvGh32ot',
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
        height: 200,
        width: 200,
        x: 104,
        y: 252,
        rotation: 0,
      },
      style: {
        id: 'c9C44ZdDnZ',
        fills: [
          {
            id: 'zt6B8BZs3X',
            type: 'SOLID',
            name: '#0000FF',
            color: {
              r: 0,
              g: 0,
              b: 255,
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
      radius: 100,
    };
    expect(CircleNode.fromJSON(json).toJSON()).toEqual(json);
  });
});
