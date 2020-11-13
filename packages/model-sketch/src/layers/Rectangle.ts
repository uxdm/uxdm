import { NodeType, RectangleNodeParams } from '@uxdm/schema';
import { SketchFormat } from '../types';
import { AbstractSketchObject } from '../abstract';

type CornerRadius = {
  bottomLeft: number;
  bottomRight: number;
  topLeft: number;
  topRight: number;
};

/**
 * 矩形类型
 * */
export class Rectangle extends AbstractSketchObject {
  constructor(params?: RectangleNodeParams) {
    super(params);

    if (params) {
      const { cornerRadius } = params;
      this.cornerRadius = cornerRadius;
    }
  }

  type: NodeType = 'Rectangle';

  /**
   * 圆角值
   */
  cornerRadius: CornerRadius | number | number[] = 0;

  clone() {
    return this;
  }

  /**
   * 转换为 Sketch JSON
   */
  toSketchJSON(): SketchFormat.Rectangle {
    const json = super.toSketchJSON();
    return {
      ...json,
      _class: 'rectangle',
      fixedRadius: 0,
      edited: false,
      pointRadiusBehaviour: 1,
      points: this.getSketchPoints(),
      isClosed: true,
      isVisible: true,
      hasConvertedToNewRoundCorners: true,
      needsConvertionToNewRoundCorners: false,
    };
  }

  /**
   * 获取 SketchPoints
   */
  getSketchPoints = (): SketchFormat.CurvePoint[] => {
    const { cornerRadius } = this;
    let topRight;
    let topLeft;
    let bottomLeft;
    let bottomRight;
    if (typeof cornerRadius === 'number') {
      topLeft = cornerRadius;
      topRight = cornerRadius;
      bottomRight = cornerRadius;
      bottomLeft = cornerRadius;
    } else if (cornerRadius instanceof Array) {
      [topLeft, topRight, bottomRight, bottomLeft] = cornerRadius;
    } else {
      topLeft = cornerRadius.topLeft;
      topRight = cornerRadius.topRight;
      bottomRight = cornerRadius.bottomRight;
      bottomLeft = cornerRadius.bottomLeft;
    }
    return [
      {
        _class: 'curvePoint',
        cornerRadius: topLeft,
        curveFrom: '{0, 0}',
        curveMode: 1,
        curveTo: '{0, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: topRight,
        curveFrom: '{1, 0}',
        curveMode: 1,
        curveTo: '{1, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: bottomRight,
        curveFrom: '{1, 1}',
        curveMode: 1,
        curveTo: '{1, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 1}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: bottomLeft,
        curveFrom: '{0, 1}',
        curveMode: 1,
        curveTo: '{0, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 1}',
      },
    ];
  };
}
