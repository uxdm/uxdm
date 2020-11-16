import { FillParams, FillType, IFill } from '@uxdm/schema';
import { Paint } from './Paint';

/**
 * 渐变对象
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
  visible: boolean;

  toJSON(): FillType {
    const json = super.toJSON();
    return {
      ...json,
      visible: this.visible,
    };
  }
}
