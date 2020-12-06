import { ShadowParams, Shadow as BaseShadow, Shadow_Type } from 'uxdm';

import { SketchFormat } from '../types';
import Color from './Color';
import { fromSketchBlendMode, getContextSettings } from '../utils';

class Shadow extends BaseShadow {
  constructor(params?: ShadowParams) {
    super(params);
    if (params) {
      const { color } = params;
      this.color = color instanceof Color ? color : new Color(color);
    }
  }

  color: Color = new Color();

  /**
   * 转为 Sketch JSON 对象
   */
  toSketchJSON = (): SketchFormat.Shadow | SketchFormat.InnerShadow => {
    return {
      _class: this._class,
      isEnabled: this.visible,
      blurRadius: this.blur,
      color: this.color.toSketchJSON(),
      contextSettings: getContextSettings(this.blendMode, this.opacity),
      offsetX: this.offsetX,
      offsetY: this.offsetY,
      spread: this.spread,
    };
  };

  get _class() {
    switch (this.type) {
      default:
      case 'SHADOW':
        return SketchFormat.ClassValue.Shadow;
      case 'INNER_SHADOW':
        return SketchFormat.ClassValue.InnerShadow;
    }
  }

  static fromSketchJSON(
    json: SketchFormat.Shadow | SketchFormat.InnerShadow,
  ): Shadow {
    const {
      _class,
      blurRadius,
      color,
      contextSettings,
      isEnabled,
      ...params
    } = json;

    const type: Shadow_Type =
      _class === 'innerShadow' ? 'INNER_SHADOW' : 'SHADOW';

    return new Shadow({
      type,
      visible: isEnabled,
      blur: blurRadius,
      blendMode: fromSketchBlendMode(contextSettings.blendMode),
      color: Color.fromSketchJSON(color),
      ...params,
    });
  }
}

export default Shadow;
