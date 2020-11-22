import {
  BlendModeType,
  IShadow,
  Point,
  Shadow_Type,
  ShadowParams,
  ShadowType,
} from '../types';
import { AbstractObject } from '../abstract/AbstractObject';
import { Color } from './Color';

/**
 * 阴影
 * @category 样式
 */
export class Shadow extends AbstractObject implements IShadow {
  constructor(params?: ShadowParams) {
    super(params);
    if (params) {
      const {
        blur,
        color,
        offsetY,
        offsetX,
        spread,
        type,
        blendMode,
        visible,
      } = params;

      this.color = new Color(color);
      this.type = type || 'SHADOW';

      this.blur = blur || 0;
      this.offsetX = offsetX || 0;
      this.offsetY = offsetY || 0;
      this.spread = spread || 0;
      this.blendMode = blendMode || 'NORMAL';

      this.visible =
        // 如果有 visible 传进来 直接使用
        visible ??
        // 否则自动判定
        !!(
          this.color.alpha !== 0 &&
          (blur || offsetX || color || offsetY || spread)
        );
    }
  }

  /**
   * 阴影类型
   */
  type: Shadow_Type = 'SHADOW';

  /**
   * 颜色
   */
  color: Color = new Color();

  /**
   * X 轴偏移
   */
  get offsetX(): number {
    return this.offset.x;
  }

  set offsetX(x: number) {
    this.offset.x = x || 0;
  }

  /**
   * Y 轴偏移
   */
  get offsetY(): number {
    return this.offset.y;
  }

  set offsetY(y: number) {
    this.offset.y = y || 0;
  }

  get opacity() {
    return this.color.alpha;
  }

  set opacity(opacity) {
    this.color.alpha = opacity;
  }

  /**
   * 扩散效果
   */
  spread: number = 0;

  /**
   * 混合模式
   */
  blendMode: BlendModeType = 'NORMAL';

  /**
   * 阴影偏移
   */
  offset: Point = { x: 0, y: 0 };

  /**
   * 模糊半径
   */
  blur: number = 0;

  /**
   * 是否可见
   */
  visible: boolean = false;

  toJSON() {
    const json = super.toJSON();
    return {
      ...json,
      offset: this.offset,
      visible: this.visible,
      type: this.type,
      blendMode: this.blendMode,
      color: this.color.toJSON(),
      blur: this.blur,
      spread: this.spread,
    };
  }

  toParams(): ShadowParams {
    return {
      color: this.color.toParams(),
      visible: this.visible,
      blendMode: this.blendMode,
      type: this.type,
      offsetX: this.offsetX,
      offsetY: this.offsetY,
      spread: this.spread,
      blur: this.blur,
    };
  }

  static fromJSON(shadow: ShadowType): Shadow {
    const { offset, ...res } = shadow;
    return new Shadow({ ...res, offsetY: offset.y, offsetX: offset.x });
  }
}
