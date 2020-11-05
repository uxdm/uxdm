import { applyToPoint, Matrix } from 'transformation-matrix';
import { AbstractRectType, BoundingParam } from '@uxdm/schema';

import { AbstractRect } from '../abstract';

/**
 * 定界框
 * @description 定界框是一种围绕在图像、形状或文本周围的矩形边框.
 * @description 用于描述对象在空间坐标中的实际位置、变换、旋转和缩放的情况
 */
export class Bounding extends AbstractRect {
  constructor(params: BoundingParam) {
    super(params);
    if (params.rotation) {
      this.rotation = params.rotation;
    }
  }

  /**
   * 旋转角度
   */
  rotation: number = 0;

  /**
   * 变换矩阵
   */
  matrix: Matrix[] = [];

  get centerX() {
    return this.x + this.width / 2;
  }

  set centerX(centerX) {
    this.x = centerX - this.width / 2;
  }

  get centerY() {
    return this.y + this.height / 2;
  }

  set centerY(centerY) {
    this.y = centerY - this.height / 2;
  }

  get right() {
    return this.x + this.width;
  }

  set right(right) {
    this.x = right - this.width;
  }

  get left() {
    return this.x;
  }

  set left(left) {
    this.x = left;
  }

  get top() {
    return this.y;
  }

  set top(top) {
    this.y = top;
  }

  get bottom() {
    return this.y + this.height;
  }

  set bottom(bottom) {
    this.y = bottom - this.height;
  }

  /**
   * 按比例缩放宽高
   * @param ratio
   */
  scale(ratio: number) {
    this.x *= ratio;
    this.y *= ratio;
    this.width *= ratio;
    this.height *= ratio;
  }

  /**
   * 偏移
   * @param x X坐标
   * @param y Y坐标
   */
  offset(x: number, y: number) {
    this.x += x;
    this.y += y;
  }

  /**
   * 应用矩阵
   * @param matrix
   */
  applyMatrix(matrix: Matrix) {
    const { x, y } = applyToPoint(matrix, { x: this.x, y: this.y });
    this.x = x;
    this.y = y;
    // 需要
    // const { a, b, c, d } = matrix;
    // const rotation = matrixToRotation(a, b, c, d);
    // this.rotation = rotation;
  }

  /**
   * 转换为 JSON 对象
   */
  toJSON = (): AbstractRectType => ({
    height: this.height,
    width: this.width,
    x: this.x,
    y: this.y,
  });
}
