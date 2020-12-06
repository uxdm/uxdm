import { Color as BaseColor } from 'uxdm';
import { SketchFormat } from '../types';

/**
 * 针对 Sketch 的颜色类
 */
class Color extends BaseColor {
  /**
   * 转为 Sketch JSON对象
   * @returns {SketchFormat.Color} color json
   */
  toSketchJSON = (): SketchFormat.Color => {
    return {
      _class: 'color',
      red: this.red / 255,
      green: this.green / 255,
      blue: this.blue / 255,
      alpha: this.alpha,
    };
  };

  /**
   * 从 Sketch JSON 获得 Sketch Color 对象
   * @param json
   */
  static fromSketchJSON(json: SketchFormat.Color): Color {
    const { alpha, blue, green, red } = json;
    return new Color({
      a: alpha,
      b: Math.round(blue * 255),
      g: Math.round(green * 255),
      r: Math.round(red * 255),
    });
  }
}

export default Color;
