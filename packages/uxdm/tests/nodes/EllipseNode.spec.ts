import { EllipseNode, EllipseNodeType } from 'uxdm';

describe('EllipseNode', () => {
  it('正常创建', () => {
    const ellipse = new EllipseNode({ x: 0, y: 50, width: 200, height: 100 });

    expect(ellipse.x).toBe(0);
    expect(ellipse.y).toBe(50);
    expect(ellipse.right).toBe(200);
    expect(ellipse.left).toBe(0);
    expect(ellipse.width).toBe(200);
    expect(ellipse.height).toBe(100);
    expect(ellipse.top).toBe(50);
    expect(ellipse.bottom).toBe(150);

    expect(ellipse.cx).toBe(100);
    expect(ellipse.cy).toBe(100);
    expect(ellipse.rx).toBe(100);
    expect(ellipse.ry).toBe(50);
  });

  it('以 rx ry cx cy 创建', () => {
    const ellipse = new EllipseNode({
      cx: 100,
      cy: 100,
      rx: 25,
      ry: 25,
    });
    expect(ellipse.cx).toBe(100);
    expect(ellipse.cy).toBe(100);
    expect(ellipse.rx).toBe(25);
    expect(ellipse.ry).toBe(25);
  });
  it('修改 rx 正常响应', () => {
    const ellipse = new EllipseNode({ x: 0, y: 50, width: 200, height: 100 });

    expect(ellipse.cx).toBe(100);
    ellipse.rx = 50;
    expect(ellipse.width).toBe(100);
    expect(ellipse.left).toBe(50);
    expect(ellipse.right).toBe(150);
    expect(ellipse.cx).toBe(100);
    expect(ellipse.rx).toBe(50);
    expect(ellipse.left).toBe(50);
    expect(ellipse.right).toBe(150);
  });

  it('fromJSON', () => {
    const json: EllipseNodeType = {
      id: 'khztUxWhU1',
      type: 'Ellipse',
      locked: false,
      name: 'ellipse',
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
        height: 100,
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
      rx: 100,
      ry: 50,
    };
    expect(EllipseNode.fromJSON(json).toJSON()).toEqual(json);
  });
});
