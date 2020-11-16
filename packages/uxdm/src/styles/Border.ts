import {
  BorderAlignType,
  BorderLineCapType,
  BorderLineJoinType,
  BorderParams,
  BorderPositionType,
  BorderType,
  IBorder,
} from '@uxdm/schema';
import { Paint } from './Paint';

/**
 * 描边对象
 * */
export class Border extends Paint implements IBorder {
  constructor(params?: BorderParams) {
    super(params);

    if (params) {
      const {
        align,
        thickness,
        position,
        dashPattern,
        lineJoin,
        lineCap,
      } = params;

      this.thickness = thickness || 1;

      this.align = align || 'INSIDE';
      this.position = position || 'FULL';
      this.lineCap = lineCap || 'NONE';
      this.lineJoin = lineJoin || 'MITER';

      if (dashPattern?.length > 0) {
        this.dashPattern = dashPattern;
      }
    }
  }

  dashPattern: number[] = [];

  lineCap: BorderLineCapType = 'NONE';

  lineJoin: BorderLineJoinType = 'MITER';

  /**
   * 描边对齐位置
   * @description 默认为内部描边
   * */
  align: BorderAlignType = 'INSIDE';

  /**
   * 描边宽度
   * @description
   *
   * @default 0
   * */
  thickness: number = 1;

  position: BorderPositionType = 'FULL';

  toJSON(): BorderType {
    const json = super.toJSON();
    return {
      ...json,
      thickness: this.thickness,
      align: this.align,
      lineCap: this.lineCap,
      lineJoin: this.lineJoin,
      dashPattern: this.dashPattern,
      position: this.position,
    };
  }
}
