import { SketchFormat } from '../types';
import Color from './Color';
import AbstractStyle from './AbstractStyle';

/**
 * 颜色资产
 */
class ColorAsset extends AbstractStyle {
  color: Color;

  constructor(hex: string, name?: string) {
    super();
    this.color = new Color(hex);
    this.name = name || hex.toUpperCase();
  }

  toSketchJSON(): SketchFormat.ColorAsset {
    return {
      _class: 'MSImmutableColorAsset',
      color: this.color.toSketchJSON(),
      do_objectID: this.id,
      name: this.name,
    };
  }
}

export default ColorAsset;
