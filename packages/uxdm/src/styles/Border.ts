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
        visible,
      } = params;

      this.thickness = thickness || 1;
      this.visible = visible ?? true;
      this.align = align || 'INSIDE';
      this.position = position || 'FULL';
      this.lineCap = lineCap || 'NONE';
      this.lineJoin = lineJoin || 'MITER';

      if (dashPattern?.length > 0) {
        this.dashPattern = dashPattern;
      }
    }
  }

  /**
   * 该描边是否可见
   */
  visible: boolean = true;

  /**
   * 虚线格式
   */
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
      visible: this.visible,
    };
  }

  /**
   * 将对象转成用于实例化的参数值
   */
  toParams(): BorderParams {
    const params = super.toParams();
    return {
      ...params,
      thickness: this.thickness,
      align: this.align,
      lineCap: this.lineCap,
      lineJoin: this.lineJoin,
      dashPattern: this.dashPattern,
      position: this.position,
      visible: this.visible,
    };
  }
}