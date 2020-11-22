import ColorCls from 'color';
import { ColorParams, ColorType, IColor } from '../types';

/**
 * 颜色
 *
 * @category 样式
 */
export class Color implements IColor {
  constructor(color?: ColorParams) {
    if (!color) {
      this.method = ColorCls();
    }

    if (color instanceof Array) {
      this.method = ColorCls.rgb(color);
    }
    // 处理 类似 rgb(242, 242, 242) 25% 这样的颜色串
    else if (
      typeof color === 'string' &&
      color.startsWith('rgb') &&
      color.endsWith('%')
    ) {
      const [rgb, percent] = color.split(')');
      this.method = ColorCls(
        `${rgb.replace('rgb', 'rgba')},${parseFloat(percent) / 100})`,
      );
    }
    // 处理 object 类型的对象
    else if (typeof color === 'object') {
      const { r = 0, b = 0, g = 0, a } = color as Partial<ColorType>;
      if (typeof a === 'number') {
        this.method = ColorCls({ r, g, b }).alpha(a);
      } else {
        this.method = ColorCls({ r, g, b });
      }
    }
    // 处理其他字符串
    else {
      this.method = ColorCls(color);
    }

    this.name = this.method.hex();
  }

  /**
   * 颜色名称
   */
  name: string;

  /**
   * 颜色方法
   */
  method: ColorCls;

  get red() {
    return this.method.red();
  }

  set red(value) {
    this.method = this.method.red(value);
  }

  get green(): number {
    return this.method.green();
  }

  set green(value) {
    this.method = this.method.green(value);
  }

  get blue(): number {
    return this.method.blue();
  }

  set blue(value) {
    this.method = this.method.blue(value);
  }

  get alpha(): number {
    return this.method.alpha();
  }

  set alpha(value) {
    this.method = this.method.alpha(value);
  }

  /**
   * HEX值
   */
  get hex(): string {
    return this.method.hex();
  }

  /**
   * 色值
   */
  get hue(): number {
    return this.method.hue();
  }

  /**
   * 默认的饱和度
   */
  get s(): number {
    return this.method.saturationv();
  }

  /**
   * 默认的饱和度
   */
  get saturation(): number {
    return this.method.saturationv();
  }

  /**
   * 明度值下的饱和度
   */
  get saturationv(): number {
    return this.method.saturationv();
  }

  /**
   * 亮度值下的饱和度
   */
  get saturationl(): number {
    return this.method.saturationl();
  }

  /**
   * 亮度值
   */
  get l(): number {
    return this.method.l();
  }

  /**
   * 亮度值
   */
  get lightness(): number {
    return this.method.lightness();
  }

  /**
   * 明度值
   */
  get b(): number {
    return this.method.b();
  }

  /**
   * 明度值
   */
  get value(): number {
    return this.method.value();
  }

  /**
   * 明度值
   */
  get brightness(): number {
    return this.method.value();
  }

  /**
   * RGBA 值
   */
  get rgba(): string {
    const r = this.method.red();
    const b = this.method.blue();
    const g = this.method.green();
    const a = this.method.alpha();
    return `rgba(${r},${g},${b},${a})`;
  }

  get rgb(): string {
    const r = this.method.red();
    const b = this.method.blue();
    const g = this.method.green();
    return `rgb(${r},${g},${b})`;
  }

  toJSON(): ColorType {
    return {
      r: this.red,
      g: this.green,
      b: this.blue,
      a: this.alpha,
    };
  }

  /**
   * 将对象转成用于实例化的参数值
   */
  toParams(): ColorParams {
    return this.toJSON();
  }

  /**
   * 从 json 还原对象
   * @param colorType
   */
  static fromJSON(colorType): Color {
    return new Color(colorType);
  }
}
