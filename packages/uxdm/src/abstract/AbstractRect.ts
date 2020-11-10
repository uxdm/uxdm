import { AbstractRectType, RectParam } from '@uxdm/schema';

/**
 * 抽象矩形
 * @description 业务实体中的抽象矩形
 * 可以用在定界框 矩形图形 布局 等实体中
 * Defines an abstract rectangle of object
 */
abstract class AbstractRect implements AbstractRectType {
  protected constructor(params: RectParam) {
    if (params) {
      const { height = 0, width = 0, x = 0, y = 0 } = params;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  }

  x: AbstractRectType['x'] = 0;

  y: AbstractRectType['y'] = 0;

  width: AbstractRectType['width'] = 0;

  height: AbstractRectType['height'] = 0;
}
export default AbstractRect;
