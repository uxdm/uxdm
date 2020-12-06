import {
  ResizingConstraint,
  Rectangle,
  SketchFormat,
} from '@uxdm/model-sketch';
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

  describe('fromSketchJSON 方法', () => {
    const input: SketchFormat.Rectangle = {
      _class: 'rectangle',
      do_objectID: '66821A79-F728-491C-B87A-1714C88E0E5D',
      booleanOperation: -1,
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isLocked: false,
      isVisible: true,
      layerListExpandedType: 0,
      name: '矩形',
      nameIsFixed: false,
      resizingConstraint: 63,
      resizingType: 0,
      rotation: 0,
      shouldBreakMaskChain: false,
      exportOptions: {
        _class: 'exportOptions',
        includedLayerIds: [],
        layerOptions: 0,
        shouldTrim: false,
        exportFormats: [],
      },
      frame: {
        _class: 'rect',
        constrainProportions: false,
        height: 296,
        width: 440,
        x: 153,
        y: 300,
      },
      clippingMaskMode: 0,
      hasClippingMask: false,
      style: {
        _class: 'style',
        do_objectID: '65FC9A82-6FFC-4C03-9842-05CEC348416A',
        endMarkerType: 0,
        miterLimit: 10,
        startMarkerType: 0,
        windingRule: 1,
        blur: {
          _class: 'blur',
          isEnabled: false,
          center: '{0.5, 0.5}',
          motionAngle: 0,
          radius: 10,
          saturation: 1,
          type: 0,
        },
        borderOptions: {
          _class: 'borderOptions',
          isEnabled: true,
          dashPattern: [],
          lineCapStyle: 0,
          lineJoinStyle: 0,
        },
        borders: [
          {
            _class: 'border',
            isEnabled: false,
            fillType: 0,
            color: {
              _class: 'color',
              alpha: 1,
              blue: 0.592,
              green: 0.592,
              red: 0.592,
            },
            contextSettings: {
              _class: 'graphicsContextSettings',
              blendMode: 0,
              opacity: 1,
            },
            gradient: {
              _class: 'gradient',
              elipseLength: 0,
              from: '{0.5, 0}',
              gradientType: 0,
              to: '{0.5, 1}',
              stops: [
                {
                  _class: 'gradientStop',
                  position: 0,
                  color: {
                    _class: 'color',
                    alpha: 1,
                    blue: 1,
                    green: 1,
                    red: 1,
                  },
                },
                {
                  _class: 'gradientStop',
                  position: 1,
                  color: {
                    _class: 'color',
                    alpha: 1,
                    blue: 0,
                    green: 0,
                    red: 0,
                  },
                },
              ],
            },
            position: 1,
            thickness: 1,
          },
        ],
        colorControls: {
          _class: 'colorControls',
          isEnabled: false,
          brightness: 0,
          contrast: 1,
          hue: 0,
          saturation: 1,
        },
        contextSettings: {
          _class: 'graphicsContextSettings',
          blendMode: 0,
          opacity: 1,
        },
        fills: [
          {
            _class: 'fill',
            isEnabled: true,
            fillType: 0,
            color: {
              _class: 'color',
              alpha: 1,
              blue: 0.6528221187004988,
              green: 0.6528221187004988,
              red: 0.7786741394927537,
            },
            contextSettings: {
              _class: 'graphicsContextSettings',
              blendMode: 0,
              opacity: 1,
            },
            gradient: {
              _class: 'gradient',
              elipseLength: 0,
              from: '{0.5, 0}',
              gradientType: 0,
              to: '{0.5, 1}',
              stops: [
                {
                  _class: 'gradientStop',
                  position: 0,
                  color: {
                    _class: 'color',
                    alpha: 1,
                    blue: 1,
                    green: 1,
                    red: 1,
                  },
                },
                {
                  _class: 'gradientStop',
                  position: 1,
                  color: {
                    _class: 'color',
                    alpha: 1,
                    blue: 0,
                    green: 0,
                    red: 0,
                  },
                },
              ],
            },
            noiseIndex: 0,
            noiseIntensity: 0,
            patternFillType: 1,
            patternTileScale: 1,
          },
        ],
        innerShadows: [],
        shadows: [],
      },
      edited: false,
      isClosed: true,
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
      fixedRadius: 0,
      needsConvertionToNewRoundCorners: false,
      hasConvertedToNewRoundCorners: true,
    };
    it('可以从 SketchJSON 获得 Rectangle 对象', () => {
      const rect = Rectangle.fromSketchJSON(input);
      expect(rect.style.fills).toHaveLength(1);
    });
  });
});
