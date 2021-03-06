import {
  BoundingParams,
  BoundingType,
  IBounding,
  PositionParams,
  SizeParams,
} from '../types';
import { AbstractRect } from '../abstract/AbstractRect';
import { checkValidParams } from '../utils';

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
      const { rotation = 0, keepAspectRatio } = params;
      this.rotation = rotation;
      this.keepAspectRatio = keepAspectRatio || false;
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
   * 维持高宽比
   * @description
   * 默认不固定保持长宽比
   *
   * @default false
   */
  keepAspectRatio: boolean = false;

  /**
   * 屏幕长宽比
   */
  get aspectRatio() {
    return this.width / this.height;
  }

  /**
   * 获取坐标
   */
  get position() {
    return { x: this.x, y: this.y };
  }

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
    keepAspectRatio: this.keepAspectRatio,
  });

  toParams = (): BoundingParams => {
    const { height, width, y, x, rotation, keepAspectRatio } = this;

    const bounding: BoundingParams = {
      height: height === 0 ? undefined : height,
      width: width === 0 ? undefined : width,
      x: x === 0 ? undefined : x,
      y: y === 0 ? undefined : y,
      rotation: rotation === 0 ? undefined : rotation,
      keepAspectRatio: keepAspectRatio || undefined,
    };

    // 校验参数有效性
    // 至少有 1 个才算有效参数 否则当成默认参数
    const isValid = checkValidParams(bounding, 0);
    if (!isValid) return;

    return bounding;
  };

  /**
   * 设置定界框位置
   * @param x
   * @param y
   */
  setPosition({ x, y }: PositionParams) {
    if (x) {
      this.x = x;
    }
    if (y) {
      this.y = y;
    }
  }

  /**
   * 更新节点尺寸
   * @param params
   */
  setSize({ height, width }: SizeParams) {
    if (height) {
      this.height = height;
    }
    if (width) {
      this.width = width;
    }
  }

  /**
   * 从 JSON 初始化定界框
   * @param json
   */
  static fromJSON(json: BoundingType): Bounding {
    return new Bounding(json);
  }
}
