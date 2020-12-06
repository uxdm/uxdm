import { Assign } from 'utility-types';
import {
  AbstractNodeParams,
  IRectangleNode,
  NodeType,
  RectangleNodeParams,
  RectangleNodeType,
} from 'uxdm';
import { SketchFormat } from '../types';
import { AbstractSketchObject } from '../abstract';
import { Frame } from '../objects';
import { Style } from '../styles';

export type SketchRectangleParams = Assign<
  AbstractNodeParams,
  RectangleNodeParams
>;

/**
 * 矩形类型
 * */
export class Rectangle extends AbstractSketchObject implements IRectangleNode {
  constructor(params?: SketchRectangleParams) {
    super(params);

    if (params) {
      const { cornerRadius } = params;
      this.cornerRadius = cornerRadius || 0;
    }
  }

  type: NodeType = 'Rectangle';

  /**
   * 圆角值
   */
  cornerRadius: number = 0;

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

  static fromSketchJSON(json: SketchFormat.Rectangle): Rectangle {
    const { do_objectID, frame, style } = json;
    return new Rectangle({
      id: do_objectID,
      bounding: Frame.fromSketchJSON(frame),
      style: Style.fromSketchJSON(style),
    });
  }

  toJSON(): RectangleNodeType {
    const json = super.toJSON();
    return { ...json, cornerRadius: this.cornerRadius };
  }
}
