import { Gradient as BaseGradient, Gradient_Type, Point } from 'uxdm';
import Color from './Color';

import { SketchFormat } from '../types';

/**
 * 渐变对象
 * */
class Gradient extends BaseGradient {
  /**
   * 获取 Sketch 的渐变类型
   */
  get sketchGradientType() {
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
      gradientType: this.sketchGradientType,
      to: `{${to.x}, ${to.y}}`,
      stops: this.sketchColorStops,
    };
  };

  /**
   * 从 Sketch JSON 转换为 Gradient 对象
   */
  static fromSketchJSON(json: SketchFormat.Gradient): Gradient {
    const { elipseLength, from, to, gradientType, stops } = json;
    let type: Gradient_Type;

    switch (gradientType) {
      case SketchFormat.GradientType.Angular:
        type = 'ANGULAR';
        break;
      default:
      case SketchFormat.GradientType.Linear:
        type = 'LINEAR';
        break;
      case SketchFormat.GradientType.Radial:
        type = 'RADIAL';
    }
    return new Gradient({
      type,
      from: Gradient.fromSketchPoint(from),
      to: Gradient.fromSketchPoint(to),
      radius: elipseLength,
      stops: stops.map((stop) => {
        const { color, position } = stop;
        return {
          color: Color.fromSketchJSON(color),
          position,
        };
      }),
    });
  }

  /**
   * 从 {x, y} 格式的字符串中提取出 x 和 y
   * @param point
   */
  static fromSketchPoint(point: string): Point {
    const res = /\{(.*),\s(.*)\}/g.exec(point);
    if (res) {
      const [, x, y] = res;
      return { x: parseFloat(x), y: parseFloat(y) };
    }
    return { x: 0, y: 0 };
  }
}

export default Gradient;
