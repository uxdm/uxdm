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
}

export default Color;
