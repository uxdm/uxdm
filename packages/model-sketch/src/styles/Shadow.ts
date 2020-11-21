import { ShadowParams, Shadow as BaseShadow } from 'uxdm';

import { SketchFormat } from '../types';
import Color from './Color';
import { getContextSettings } from '../utils';

class Shadow extends BaseShadow {
  constructor(params?: ShadowParams) {
    super(params);
    if (params) {
      const { color } = params;
      this.color = new Color(color);
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
}

export default Shadow;
