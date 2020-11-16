import { Style } from '../../src/styles';
import { defaultColorStops } from './defaultValue';

describe('Style 类', () => {
  it('无参数', () => {
    const style = new Style();
    expect(style.toJSON()).toEqual({
      borderOptions: {
        align: 'INSIDE',
        dashPattern: [],
        lineCap: 'NONE',
        lineJoin: 'MITER',
      },
      borders: [],
      fills: [],
      id: 'id',
      innerShadows: [],
      shadows: [],
    });
  });
  it('部分参数', () => {
    const style = new Style({});
    expect(style.toJSON()).toEqual({
      borderOptions: {
        align: 'INSIDE',
        dashPattern: [],
        lineCap: 'NONE',
        lineJoin: 'MITER',
      },
      borders: [],
      fills: [],
      id: 'id',
      innerShadows: [],
      shadows: [],
    });
  });
  it('满参数', () => {
    const style = new Style({
      borderOptions: {
        lineJoin: 'ROUND',
        dashPattern: [3, 4],
        align: 'CENTER',
        lineCap: 'ROUND',
      },
      fills: [
        {
          type: 'GRADIENT',
          opacity: 0.4,
          gradient: {
            from: { x: 0.3, y: 1 },
            to: { x: 0.5, y: 1 },
            type: 'LINEAR',
            stops: ['red', 'green'],
          },
        },
      ],
      borders: [{ type: 'SOLID', color: 'yellow' }],
      shadows: [
        { color: 'rgb(2,4,91)', offsetX: 4, offsetY: 34, blur: 4, spread: 13 },
      ],
      innerShadows: [
        {
          color: '#123f1a',
          offsetX: 2,
          offsetY: 4,
          blur: 8,
          blendMode: 'COLOR_BURN',
          visible: false,
        },
      ],
    });
    expect(JSON.parse(JSON.stringify(style.toJSON()))).toEqual({
      borderOptions: {
        lineJoin: 'ROUND',
        dashPattern: [3, 4],
        align: 'CENTER',
        lineCap: 'ROUND',
      },
      borders: [
        {
          visible: true,
          align: 'INSIDE',
          color: {
            a: 1,
            b: 0,
            g: 255,
            hex: '#FFFF00',
            r: 255,
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
          name: '#FFFF00',
          opacity: 1,
          position: 'FULL',
          thickness: 1,
          type: 'SOLID',
        },
      ],
      fills: [
        {
          visible: true,
          color: {
            a: 1,
            b: 0,
            g: 0,
            hex: '#000000',
            r: 0,
          },
          gradient: {
            from: {
              x: 0.3,
              y: 1,
            },
            radius: 1,
            stops: [
              {
                color: {
                  a: 1,
                  b: 0,
                  g: 0,
                  hex: '#FF0000',
                  r: 255,
                },
                position: 0,
              },
              {
                color: {
                  a: 1,
                  b: 0,
                  g: 128,
                  hex: '#008000',
                  r: 0,
                },
                position: 1,
              },
            ],
            to: {
              x: 0.5,
              y: 1,
            },
            type: 'LINEAR',
          },
          id: 'id',
          name: 'Gradient',
          opacity: 1,
          type: 'GRADIENT',
        },
      ],
      id: 'id',
      innerShadows: [
        {
          blendMode: 'COLOR_BURN',
          blur: 8,
          color: {
            a: 1,
            b: 26,
            g: 63,
            hex: '#123F1A',
            r: 18,
          },
          id: 'id',
          offset: {
            x: 2,
            y: 4,
          },
          spread: 0,
          type: 'INNER_SHADOW',
          visible: false,
        },
      ],
      shadows: [
        {
          blendMode: 'NORMAL',
          blur: 4,
          color: {
            a: 1,
            b: 91,
            g: 4,
            hex: '#02045B',
            r: 2,
          },
          id: 'id',
          offset: {
            x: 4,
            y: 34,
          },
          spread: 13,
          type: 'SHADOW',
          visible: true,
        },
      ],
    });
  });

  describe('方法', () => {
    describe('添加填充', () => {
      it('添加单个填充', () => {
        const style = new Style();
        expect(style.fills).toHaveLength(0);
        style.addFill({
          type: 'IMAGE',
          image:
            'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        });
        expect(style.fills).toHaveLength(1);
        const image = style.fills[0];
        expect(image.type).toEqual('IMAGE');
        expect(image.image.url).toEqual(
          'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        );
      });
      it('添加多个填充', () => {
        const style = new Style();
        expect(style.fills).toHaveLength(0);
        style.addFills([]);
        expect(style.fills).toHaveLength(0);
        style.addFills([
          {
            type: 'IMAGE',
            image:
              'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
          },
          {
            type: 'SOLID',
            color: '#e15684',
          },
        ]);
        expect(style.fills).toHaveLength(2);
        const [, color] = style.fills;
        expect(color.type).toEqual('SOLID');
        expect(color.color.toJSON()).toEqual({
          a: 1,
          b: 132,
          g: 86,
          hex: '#E15684',
          r: 225,
        });
      });
      it('添加颜色填充', () => {
        const style = new Style();
        expect(style.fills).toHaveLength(0);
        style.addColorFill('red');
        expect(style.fills).toHaveLength(1);
        expect(style.fills[0].type).toEqual('SOLID');
      });
      it('添加渐变填充', () => {
        const style = new Style();
        expect(style.fills).toHaveLength(0);
        style.addGradientFill({ type: 'RADIAL' });
        expect(style.fills).toHaveLength(1);
        expect(style.fills[0].type).toEqual('GRADIENT');
      });
      it('添加图片填充', () => {
        const style = new Style();
        expect(style.fills).toHaveLength(0);
        style.addImageFill(
          'https://gw.alipayobjects.com/zos/antfincdn/yQkRq3OIYO/b85f8741-a187-4f97-be93-9356dc28dc0f.png',
        );
        expect(style.fills).toHaveLength(1);
        expect(style.fills[0].type).toEqual('IMAGE');
      });
    });
    it('添加描边', () => {
      const style = new Style();
      expect(style.borders).toHaveLength(0);
      style.addBorder({ color: 'green' });
      expect(style.borders).toHaveLength(1);
      expect(style.borders[0].type).toEqual('SOLID');
    });
    describe('添加阴影', () => {
      it('添加外阴影', () => {
        const style = new Style();
        expect(style.shadows).toHaveLength(0);
        style.addShadow();
        expect(style.shadows).toHaveLength(1);
        expect(style.shadows[0].type).toEqual('SHADOW');
      });
      it('添加内阴影', () => {
        const style = new Style();
        expect(style.innerShadows).toHaveLength(0);
        style.addInnerShadow();
        expect(style.innerShadows).toHaveLength(1);
        expect(style.innerShadows[0].type).toEqual('INNER_SHADOW');
      });
    });

    describe('设置描边属性 setBorderDashed', () => {
      it('没参数', () => {
        const style = new Style();
        style.setBorderDashed({});

        expect(style.borderOptions).toEqual({
          align: 'INSIDE',
          dashPattern: [],
          lineCap: 'NONE',
          lineJoin: 'MITER',
        });
      });

      describe('设置虚线', () => {
        const style = new Style();
        it('设置虚线宽度', () => {
          style.setBorderDashed({ dash: 2 });
          expect(style.borderOptions.dashPattern).toEqual([2, 4]);

          style.setBorderDashed({ dash: 0 });
          expect(style.borderOptions.dashPattern).toEqual([0, 4]);

          style.setBorderDashed({ dashed: false });
        });

        it('设置虚线间距', () => {
          style.setBorderDashed({ spacing: 2 });
          expect(style.borderOptions.dashPattern).toEqual([4, 2]);

          style.setBorderDashed({ spacing: 0 });

          expect(style.borderOptions.dashPattern).toEqual([4, 0]);

          style.setBorderDashed({ dashed: false });
        });

        it('设 0 0 时取消虚线模式', () => {
          style.setBorderDashed({ dash: 2 });
          expect(style.borderOptions.dashPattern).toEqual([2, 4]);

          style.setBorderDashed({ spacing: 0, dash: 0 });

          expect(style.borderOptions.dashPattern).toEqual([]);
        });

        it('完整参数', () => {
          style.setBorderDashed({
            lineCap: 'SQUARE',
            align: 'OUTSIDE',
            lineJoin: 'BEVEL',
            dash: 1,
            spacing: 3,
          });

          expect(style.borderOptions).toEqual({
            lineCap: 'SQUARE',
            align: 'OUTSIDE',
            lineJoin: 'BEVEL',
            dashPattern: [1, 3],
          });
        });
      });
    });
  });
});
