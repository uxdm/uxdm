import { FillParams, FillType, IFill } from '../types';
import { Paint } from './Paint';
import { Color } from './Color';
import { Gradient } from './Gradient';
import { Image } from '../objects';

/**
 * 填充对象
 *
 * @category 样式
 * */
export class Fill extends Paint implements IFill {
  constructor(params?: FillParams) {
    super(params);
    if (params) {
      const { visible } = params;

      this.visible = visible ?? true;
    }
  }

  /**
   * 该填色是否可见
   */
  visible: boolean = true;

  /**
   * 色值
   * 如果是实色填充则返回 hex
   */
  get hex(): string | undefined {
    if (this.type === 'SOLID') {
      return this.color.hex;
    }
  }

  toJSON(): FillType {
    const json = super.toJSON();
    return {
      ...json,
      visible: this.visible,
    };
  }

  toParams(): FillParams {
    const params = super.toParams();
    return {
      ...params,
      visible: this.visible,
    };
  }

  static fromJSON(params: FillType | FillType[]): Fill | Fill[] {
    const fromFillParams = (fill: FillType) => {
      const { image, color, gradient, ...res } = fill;

      return new Fill({
        image: Image.fromJSON(image),
        color: Color.fromJSON(color),
        gradient: Gradient.fromJSON(gradient),
        ...res,
      });
    };

    if (params instanceof Array) {
      return params.map(fromFillParams);
    }
    return fromFillParams(params);
  }
}
