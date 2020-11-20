import { ResizingConstraint, Rectangle } from '@uxdm/model-sketch';
import { calcResizingConstraint } from '@uxdm/model-sketch/utils';

describe('Rectangle 类', () => {
  describe('toSketchJSON 转换正常', () => {
    it('正常转换', () => {
      const rect = new Rectangle({ height: 100, width: 50, x: 280, y: 100 });
      rect.name = 'Rect';
      const json = rect.toSketchJSON();
      expect(JSON.parse(JSON.stringify(json))).toStrictEqual({
        _class: 'rectangle',
        booleanOperation: -1,
        clippingMaskMode: 0,
        do_objectID: 'UUID',
        edited: false,
        exportOptions: {
          _class: 'exportOptions',
          exportFormats: [],
          includedLayerIds: [],
          layerOptions: 0,
          shouldTrim: false,
        },
        fixedRadius: 0,
        frame: {
          _class: 'rect',
          constrainProportions: false,
          height: 100,
          width: 50,
          x: 280,
          y: 100,
        },
        hasConvertedToNewRoundCorners: true,
        isClosed: true,
        isFixedToViewport: false,
        isFlippedHorizontal: false,
        isFlippedVertical: false,
        hasClippingMask: false,
        isLocked: false,
        isVisible: true,
        layerListExpandedType: 0,
        name: 'Rect',
        nameIsFixed: false,
        needsConvertionToNewRoundCorners: false,
        pointRadiusBehaviour: 1,
        points: [
          {
            _class: 'curvePoint',
            cornerRadius: 0,
            curveFrom: '{0, 0}',
            curveMode: 1,
            curveTo: '{0, 0}',
            hasCurveFrom: false,
            hasCurveTo: false,
            point: '{0, 0}',
          },
          {
            _class: 'curvePoint',
            cornerRadius: 0,
            curveFrom: '{1, 0}',
            curveMode: 1,
            curveTo: '{1, 0}',
            hasCurveFrom: false,
            hasCurveTo: false,
            point: '{1, 0}',
          },
          {
            _class: 'curvePoint',
            cornerRadius: 0,
            curveFrom: '{1, 1}',
            curveMode: 1,
            curveTo: '{1, 1}',
            hasCurveFrom: false,
            hasCurveTo: false,
            point: '{1, 1}',
          },
          {
            _class: 'curvePoint',
            cornerRadius: 0,
            curveFrom: '{0, 1}',
            curveMode: 1,
            curveTo: '{0, 1}',
            hasCurveFrom: false,
            hasCurveTo: false,
            point: '{0, 1}',
          },
        ],
        resizingConstraint: 9,
        resizingType: 0,
        rotation: 0,
        shouldBreakMaskChain: false,
        style: {
          _class: 'style',
          borderOptions: {
            _class: 'borderOptions',
            dashPattern: [],
            isEnabled: true,
            lineCapStyle: 0,
            lineJoinStyle: 0,
          },
          borders: [],
          colorControls: {
            _class: 'colorControls',
            brightness: 0,
            contrast: 1,
            hue: 0,
            isEnabled: false,
            saturation: 1,
          },
          contextSettings: {
            _class: 'graphicsContextSettings',
            blendMode: 0,
            opacity: 1,
          },
          do_objectID: 'UUID',
          endMarkerType: 0,
          fills: [],
          innerShadows: [],
          miterLimit: 10,
          shadows: [],
          startMarkerType: 0,
          windingRule: 1,
        },
      });
    });
    it('蒙版正常', () => {
      const rect = new Rectangle({ height: 100, width: 50, x: 280, y: 100 });
      rect.hasClippingMask = true;

      const json = rect.toSketchJSON();
      expect(json.hasClippingMask).toBeTruthy();
    });
  });

  describe('测试方法', () => {
    const rect = new Rectangle();
    it('get set 方法', () => {
      expect(rect.isLocked).toBeFalsy();
      rect.isLocked = true;
      expect(rect.isLocked).toBeTruthy();
      rect.isVisible = false;
      expect(rect.isVisible).toBeFalsy();
      rect.isFlippedHorizontal = true;
      expect(rect.isFlippedHorizontal).toBeTruthy();
      rect.isFlippedVertical = true;
      expect(rect.isFlippedVertical).toBeTruthy();
    });
    it('userInfo', () => {
      rect.setUserInfo('test', '123', 'Test');
      rect.setUserInfo('test2', 'test');
      expect(rect.getUserInfo('test', 'Test')).toBe('123');
      expect(rect.getUserInfo('test2')).toBe('test');
      expect(rect.getUserInfo('test2', 'Test')).toBeUndefined();
    });
  });
  describe('约束方法', () => {
    describe('set ResizingConstraint', () => {
      it('没约束 给定默认', () => {
        const rect = new Rectangle();
        rect.setResizingConstraint(ResizingConstraint.None);
        expect(rect.constraints).toEqual({
          vertical: 'SCALE',
          horizontal: 'SCALE',
        });
      });
      it('约束:左 右', () => {
        const rect = new Rectangle();
        const constraint = [ResizingConstraint.Left, ResizingConstraint.Right];
        rect.setResizingConstraint(...constraint);
        expect(rect.constraints).toEqual({
          vertical: 'MIN',
          horizontal: 'STRETCH',
        });
      });

      it('约束:宽 高', () => {
        const rect = new Rectangle();
        const constraint = [
          ResizingConstraint.Width,
          ResizingConstraint.Height,
        ];
        rect.setResizingConstraint(...constraint);
        expect(rect.constraints).toEqual({
          vertical: 'CENTER',
          horizontal: 'CENTER',
        });
      });
      it('约束:左 顶', () => {
        const rect = new Rectangle();
        const constraint = [ResizingConstraint.Top, ResizingConstraint.Left];
        rect.setResizingConstraint(...constraint);

        expect(rect.constraints).toEqual({
          vertical: 'MIN',
          horizontal: 'MIN',
        });
      });
      it('约束:左 右 上 下', () => {
        const rect = new Rectangle();
        const constraint = [
          ResizingConstraint.Top,
          ResizingConstraint.Bottom,
          ResizingConstraint.Left,
          ResizingConstraint.Right,
        ];
        rect.setResizingConstraint(...constraint);

        expect(rect.constraints).toEqual({
          vertical: 'STRETCH',
          horizontal: 'STRETCH',
        });
      });

      it('约束:右 底 高度', () => {
        const rect = new Rectangle();
        const constraint = [
          ResizingConstraint.Height,
          ResizingConstraint.Bottom,
          ResizingConstraint.Right,
        ];
        rect.setResizingConstraint(...constraint);
        expect(rect.constraints).toEqual({
          vertical: 'MAX',
          horizontal: 'MAX',
        });
      });

      describe('错误的布局参数会报错', () => {
        const rect = new Rectangle();
        it('约束:顶 底 高度 , 会报错', () => {
          const { Top, Bottom, Height } = ResizingConstraint;

          expect(() =>
            rect.setResizingConstraint(Top, Bottom, Height),
          ).toThrow();
        });
        it('undefined 参数会报错', () => {
          // @ts-ignore
          const { Top, wat } = ResizingConstraint;

          expect(() => rect.setResizingConstraint(Top, wat)).toThrow();
        });
        it('约束:左 右 宽度 ,会报错', () => {
          const { Left, Right, Width } = ResizingConstraint;

          expect(() =>
            rect.setResizingConstraint(Left, Right, Width),
          ).toThrow();
        });
      });
    });
    describe('get resizingConstraint', () => {
      it('没约束', () => {
        const rect = new Rectangle({
          constraints: { vertical: 'SCALE', horizontal: 'SCALE' },
        });
        expect(rect.resizingConstraint).toEqual(
          calcResizingConstraint(ResizingConstraint.None),
        );
      });
      it('约束:左 右 顶 高度', () => {
        const rect = new Rectangle({
          constraints: { vertical: 'MIN', horizontal: 'STRETCH' },
        });

        const constraint = [
          ResizingConstraint.Height,
          ResizingConstraint.Left,
          ResizingConstraint.Top,
          ResizingConstraint.Right,
        ];

        expect(rect.resizingConstraint).toEqual(
          calcResizingConstraint(...constraint),
        );
      });
      it('约束:左 右 上 下', () => {
        const rect = new Rectangle({
          constraints: { vertical: 'STRETCH', horizontal: 'STRETCH' },
        });
        const constraint = [
          ResizingConstraint.Top,
          ResizingConstraint.Bottom,
          ResizingConstraint.Left,
          ResizingConstraint.Right,
        ];
        expect(rect.resizingConstraint).toBe(
          calcResizingConstraint(...constraint),
        );
      });
      it('约束:左 右', () => {
        const rect = new Rectangle({
          constraints: { horizontal: 'STRETCH' },
        });
        const constraint = [
          ResizingConstraint.Left,
          ResizingConstraint.Right,
          ResizingConstraint.Top,
          ResizingConstraint.Height,
        ];
        expect(rect.resizingConstraint).toBe(
          calcResizingConstraint(...constraint),
        );
      });
      it('约束:右 宽度 底 高度', () => {
        const rect = new Rectangle({
          constraints: { horizontal: 'MAX', vertical: 'MAX' },
        });
        const constraint = [
          ResizingConstraint.Width,
          ResizingConstraint.Right,
          ResizingConstraint.Bottom,
          ResizingConstraint.Height,
        ];
        expect(rect.resizingConstraint).toBe(
          calcResizingConstraint(...constraint),
        );
      });
      it('约束:宽度 高度', () => {
        const rect = new Rectangle({
          constraints: { horizontal: 'CENTER', vertical: 'CENTER' },
        });
        const constraint = [
          ResizingConstraint.Width,
          ResizingConstraint.Height,
        ];
        expect(rect.resizingConstraint).toBe(
          calcResizingConstraint(...constraint),
        );
      });
    });
  });
});
