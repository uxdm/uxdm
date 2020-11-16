import { Matrix } from '@uxdm/schema';
import { Bounding } from 'uxdm';
import { applyToPoint } from 'transformation-matrix';

import { SketchFormat } from '../types';
import { matrixToRotation } from '../utils/matrix';

/**
 * Sketch 的定界框
 */
export class SketchBounding extends Bounding {
  /**
   * 翻转 X 轴
   */
  horizontalFlipped = false;

  /**
   * 翻转 Y 轴
   */
  verticalFlipped = false;

  /**
   * 应用矩阵
   * @param matrix
   */
  applyMatrix(matrix: Matrix) {
    const { x, y } = applyToPoint(matrix, { x: this.x, y: this.y });
    this.x = x;
    this.y = y;
    // 需要
    const { a, b, c, d } = matrix;
    const rotation = matrixToRotation(a, b, c, d);
    this.rotation = rotation;
  }

  /**
   * 转为 Sketch JSON 对象
   */
  toSketchJSON = (): SketchFormat.Rect => {
    return {
      _class: 'rect',
      constrainProportions: this.constrainProportions ?? false,
      height: this.height || 0,
      width: this.width || 0,
      x: this.x || 0,
      y: this.y || 0,
    };
  };
}
