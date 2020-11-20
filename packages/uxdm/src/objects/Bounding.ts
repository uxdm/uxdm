import { BoundingParams, BoundingType, IBounding } from '@uxdm/schema';
import { AbstractRect } from '../abstract';

/**
 * 定界框
 * @description
 * 定界框是一种围绕在图像、形状或文本周围的矩形边框.
 *
 * 用于描述对象在空间坐标中的实际位置、变换、旋转和缩放的情况
 * @category 对象
 */
export class Bounding extends AbstractRect implements IBounding {
  constructor(params?: BoundingParams) {
    super(params);
    if (params) {
      const { rotation = 0 } = params;
      this.rotation = rotation;
    }
  }

  /**
   * 旋转角度
   */
  rotation: BoundingType['rotation'] = 0;

  /**
   * 变换矩阵
   */
  matrices: IBounding['matrices'] = [];

  /**
   * 维持长宽比
   * @description
   * 默认不固定保持长宽比
   *
   * @default false
   */
  constrainProportions: boolean = false;

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
   * @param origin 缩放原点
   */
  scale(
    ratio: number,
    // origin?: Point
  ) {
    // this.x *= ratio;
    // this.y *= ratio;
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
   * 转换为 JSON 对象
   */
  toJSON = (): BoundingType => ({
    height: this.height,
    width: this.width,
    x: this.x,
    y: this.y,
    rotation: this.rotation,
  });

  /**
   * 从 JSON 初始化定界框
   * @param json
   */
  static fromJSON = (json: BoundingParams) => {
    return new Bounding(json);
  };
}
