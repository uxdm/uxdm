import { Fill as BaseFill } from 'uxdm';
import { FillParams } from '@uxdm/schema';
import Color from './Color';
import Gradient from './Gradient';
import Image from './Image';
import { SketchFormat } from '../types';
import { getContextSettings, getFillType } from '../utils';

/**
 * Sketch 填充对象
 * */
class Fill extends BaseFill {
  constructor(params?: FillParams) {
    super(params);
    if (params) {
      const { color, image, gradient } = params;
      if (color) {
        this.color = new Color(color);
      }
      if (image) {
        this.image = new Image(image);
      }
      if (gradient) {
        this.gradient = new Gradient(gradient);
      }
    }
  }

  /**
   *  Sketch 专门的颜色
   */
  color: Color = new Color();

  /**
   * 渐变类型
   * */
  gradient: Gradient = new Gradient();

  /**
   * 使用图片进行填充
   * */
  image?: Image;

  /**
   * 填充类型
   * */
  patternFillType: SketchFormat.PatternFillType =
    SketchFormat.PatternFillType.Fill;

  patternTileScale: number = 1;

  /**
   * 转为 Sketch JSON 对象
   * @returns {SketchFormat.Fill}
   */
  toSketchJSON = (): SketchFormat.Fill => {
    return {
      _class: SketchFormat.ClassValue.Fill,
      isEnabled: this.visible,
      fillType: getFillType(this.type),
      color: this.color.toSketchJSON(),
      contextSettings: getContextSettings(this.blendMode, this.opacity),
      gradient: this.gradient.toSketchJSON(),
      noiseIndex: 0, // 旧版本似乎可以填充噪点
      noiseIntensity: 0,
      patternFillType: this.patternFillType,
      patternTileScale: this.patternTileScale,
      image: this.image?.toSketchJSON(),
    };
  };
}

export default Fill;
