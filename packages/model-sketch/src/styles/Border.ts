import {
  Border as BaseBorder,
  BorderAlignType,
  BorderParams,
  ColorParams,
  GradientParams,
} from 'uxdm';
import Color from './Color';
import Gradient from './Gradient';
import { SketchFormat } from '../types';
import {
  fromSketchBlendMode,
  fromSketchFillType,
  getContextSettings,
  getFillType,
} from '../utils';

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

  static fromSketchJSON(json: SketchFormat.Border): Border {
    const {
      fillType,
      color,
      contextSettings,
      gradient,
      position: sketchPosition,
      thickness,
      isEnabled,
    } = json;
    const { opacity, blendMode } = contextSettings;

    let align: BorderAlignType;

    switch (sketchPosition) {
      default:
      case SketchFormat.BorderPosition.Inside:
        align = 'INSIDE';
        break;
      case SketchFormat.BorderPosition.Center:
        align = 'CENTER';
        break;
      case SketchFormat.BorderPosition.Outside:
        align = 'OUTSIDE';
        break;
    }

    return new Border({
      type: fromSketchFillType(fillType),
      color: Color.fromSketchJSON(color),
      gradient: Gradient.fromSketchJSON(gradient),
      visible: isEnabled,
      blendMode: fromSketchBlendMode(blendMode),
      opacity,
      thickness,
      align,
    });
  }
}

export default Border;
