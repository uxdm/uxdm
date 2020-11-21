import { BorderParams, ColorParams, GradientParams } from '@uxdm/schema';
import { Border as BaseBorder } from 'uxdm';
import Color from './Color';
import Gradient from './Gradient';
import { SketchFormat } from '../types';
import { getContextSettings, getFillType } from '../utils';

/**
 * 描边对象
 * */
class Border extends BaseBorder {
  constructor(params?: BorderParams) {
    super(params);
    if (params) {
      const { color, gradient } = params;

      if (color) {
        this.color =
          color instanceof Color ? color : new Color(color as ColorParams);
      }

      if (gradient) {
        this.gradient =
          gradient instanceof Gradient
            ? gradient
            : new Gradient(gradient as GradientParams);
      }
    }
  }

  color: Color = new Color();

  gradient: Gradient = new Gradient();

  get sketchPosition() {
    switch (this.align) {
      default:
      case 'INSIDE':
        return SketchFormat.BorderPosition.Inside;
      case 'CENTER':
        return SketchFormat.BorderPosition.Center;
      case 'OUTSIDE':
        return SketchFormat.BorderPosition.Outside;
    }
  }

  /**
   * 转为 Sketch JSON 对象
   * @returns {SketchFormat.Border}
   */
  toSketchJSON = (): SketchFormat.Border => {
    return {
      _class: SketchFormat.ClassValue.Border,
      isEnabled: this.visible,
      fillType: getFillType(this.type),
      color: this.color.toSketchJSON(),
      contextSettings: getContextSettings(this.blendMode, this.opacity),
      gradient: this.gradient.toSketchJSON(),
      position: this.sketchPosition,
      thickness: this.thickness,
    };
  };
}

export default Border;
