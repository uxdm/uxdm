import {
  Point,
  GradientTypes,
  IGradient,
  ColorStop,
  GradientParams,
  ColorStopParams,
} from '@uxdm/schema';
import { Color } from './Color';

/**
 * @internal
 */
const defaultColorStopParams = ['black', 'white'];
/**
 * 渐变对象
 *
 * @category 样式
 * */
export class Gradient implements IGradient {
  constructor(params?: GradientParams) {
    if (!params) {
      return;
    }

    const { from, to, stops, type, radius } = params;

    this.type = type || 'LINEAR';

    if (from) {
      this.from = from;
    }
    if (to) {
      this.to = to;
    }
    if (stops) {
      const colorStops: ColorStopParams[] =
        stops.length > 0 ? stops : defaultColorStopParams;
      this.stops = Gradient.getColorStops(colorStops);
    }

    if (['ANGULAR', 'RADIAL'].includes(this.type) && radius) {
      this.radius = radius;
    }
  }

  /**
   * 起点
   */
  from: Point = { x: 0.5, y: 0 };

  /**
   * 终点
   */
  to: Point = { x: 0.5, y: 1 };

  /**
   * 色彩节点
   */
  stops: ColorStop[] = Gradient.getColorStops(defaultColorStopParams);

  /**
   * 渐变类型
   * */
  type: GradientTypes = 'LINEAR';

  /**
   * 椭圆长轴
   * @description
   * 控制椭圆渐变长轴
   */
  radius?: number;

  toJSON() {
    return {
      type: this.type,
      from: this.from,
      to: this.to,
      stops: this.stops.map((stop) => ({
        position: stop.position,
        color: stop.color.toJSON(),
      })),
      radius: this.radius,
    };
  }

  toParams() {
    return {
      stops: this.stops.map((stop) => {
        return {
          color: stop.color.toParams(),
          position: stop.position,
        };
      }),
      type: this.type,
      to: this.to,
      from: this.from,
      radius: this.radius,
    };
  }

  /**
   * 从 colorStop 参数项获取 ColorStop 类
   * @param stops
   */
  static getColorStops(stops: ColorStopParams[]) {
    return stops.map((stopParam, index) => {
      // 判断是对象类型的 stop 参数
      if (typeof stopParam === 'object' && 'color' in stopParam) {
        return {
          color: new Color(stopParam.color),
          position: stopParam.position
            ? stopParam.position
            : index / (stops.length - 1),
        };
      }

      // 不然就是颜色类型的 stop 参数
      return {
        color: new Color(stopParam),
        position: index / (stops.length - 1),
      };
    });
  }
}
