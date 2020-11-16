import { Gradient as BaseGradient } from 'uxdm';
import Color from './Color';

import { SketchFormat } from '../types';

/**
 * 渐变对象
 * */
class Gradient extends BaseGradient {
  get gradientType() {
    switch (this.type) {
      default:
      case 'LINEAR':
        return SketchFormat.GradientType.Linear;
      case 'RADIAL':
        return SketchFormat.GradientType.Radial;
      case 'ANGULAR':
        return SketchFormat.GradientType.Angular;
    }
  }

  /**
   * 将 stop 数组转换为 Sketch 使用的对象
   * */
  get sketchColorStops(): SketchFormat.GradientStop[] {
    return this.stops.map((colorStop, index) => {
      const color = new Color(colorStop.color.toJSON());

      return {
        _class: 'gradientStop',
        color: color.toSketchJSON(),
        position:
          // 如果有 offset 则使用 offset
          colorStop.position
            ? colorStop.position
            : // 否则均分
              index / (this.stops.length - 1),
      };
    });
  }

  /**
   * 转为 Sketch JSON 对象
   */
  toSketchJSON = (): SketchFormat.Gradient => {
    const { from, to } = this;
    return {
      _class: SketchFormat.ClassValue.Gradient,
      elipseLength: this.radius,
      from: `{${from.x}, ${from.y}}`,
      gradientType: this.gradientType,
      to: `{${to.x}, ${to.y}}`,
      stops: this.sketchColorStops,
    };
  };
}

export default Gradient;
