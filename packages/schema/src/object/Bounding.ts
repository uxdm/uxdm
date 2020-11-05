import { RectInitParam } from '../index';
/**
 * 定界框入参类型
 */
export interface BoundingParam extends RectInitParam {
  /**
   * 旋转参数
   */
  rotation?: number;
}
