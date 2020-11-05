import { AbstractRectType, RectInitParam } from '@uxdm/schema';

/**
 * 抽象矩形
 * @description 业务实体中的抽象矩形
 * 可以用在定界框 矩形图形 布局 等实体中
 * Defines an abstract rectangle of object
 */
abstract class AbstractRect implements AbstractRectType {
  protected constructor(params: RectInitParam) {
    if (params) {
      const { height = 0, width = 0, x = 0, y = 0 } = params;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  }

  x: number = 0;

  y: number = 0;

  width: number = 0;

  height: number = 0;
}
export default AbstractRect;
