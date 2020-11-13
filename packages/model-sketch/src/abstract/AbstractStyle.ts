import { uuid } from '../utils';
import { SketchFormat } from '../types';

abstract class AbstractStyle {
  constructor() {
    this.id = uuid();
  }

  id: string;

  name: string = '';

  /**
   * 透明度
   * */
  private _opacity: number = 1;

  get opacity() {
    return this._opacity;
  }

  set opacity(opacity: string | number) {
    this._opacity = Number(opacity);
  }

  getContextSettings = (): SketchFormat.GraphicsContextSettings => {
    return {
      _class: 'graphicsContextSettings',
      blendMode: SketchFormat.BlendMode.Normal,
      opacity: this._opacity,
    };
  };
}

export default AbstractStyle;
