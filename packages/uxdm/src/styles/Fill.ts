import { FillParams, FillType, PaintType, IFill } from '@uxdm/schema';
import { AbstractObject } from '../abstract/AbstractObject';
import { Color } from './Color';
import { Gradient } from './Gradient';
import { Image } from './Image';

/**
 * 渐变对象
 * */
export class Fill extends AbstractObject implements IFill {
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

          break;
        case 'IMAGE':
          if (image) {
            this.image = new Image(image);
          }
      }

      this.name = name || defaultName;
    }
  }

  type: PaintType = 'SOLID';

  name: string = 'Fill';

  /**
   * 颜色
   */
  color: Color = new Color();

  gradient: Gradient = new Gradient();

  image: Image;

  toJSON(): FillType {
    const json = super.toJSON();
    return {
      ...json,
      type: this.type,
      name: this.name,
      color: this.color.toJSON(),
      gradient: this.gradient.toJSON(),
      image: this.image?.toJSON(),
    };
  }
}
