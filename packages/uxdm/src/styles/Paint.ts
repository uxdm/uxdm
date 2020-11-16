import { FillParams, Paint_Type, IPaint, PaintType } from '@uxdm/schema';
import { AbstractObject } from '../abstract/AbstractObject';
import { Color } from './Color';
import { Gradient } from './Gradient';
import { Image } from './Image';

/**
 * 渐变对象
 * */
export class Paint extends AbstractObject implements IPaint {
  constructor(params?: FillParams) {
    super(params);
    if (params) {
      const { type, color, name, image, gradient } = params;

      if (type) {
        this.type = type;
      }

      let defaultName = '';
      switch (type) {
        case 'SOLID':
        default:
          this.color = new Color(color);
          defaultName = this.color.hex;
          break;
        case 'GRADIENT':
          this.gradient = new Gradient(gradient);
          defaultName = 'Gradient';
          break;
        case 'IMAGE':
          if (image) {
            this.image = new Image(image);
          }
          defaultName = 'Image';
      }

      this.name = name || defaultName;
    }
  }

  type: Paint_Type = 'SOLID';

  name: string = 'Fill';

  /**
   * 颜色
   */
  color: Color = new Color();

  gradient: Gradient = new Gradient();

  image: Image;

  private _opacity: number = 1;

  get opacity() {
    if (this.type === 'SOLID') {
      return this.color.alpha;
    }
    return this._opacity;
  }

  set opacity(value) {
    if (this.type === 'SOLID') {
      this.color.alpha = value;
      return;
    }
    this._opacity = Math.min(Number(value), 1);
  }

  toJSON(): PaintType {
    const json = super.toJSON();
    return {
      ...json,
      type: this.type,
      name: this.name,
      color: this.color.toJSON(),
      gradient: this.gradient.toJSON(),
      image: this.image?.toJSON(),
      opacity: this.opacity,
    };
  }
}
