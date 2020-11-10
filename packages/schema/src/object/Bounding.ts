import { AbstractRectType, Matrix } from '../abstract';

/**
 * 定界框输出类型
 */
export interface BoundingType extends AbstractRectType {
  /**
   * 旋转参数
   */
  rotation: number;
  /**
   * 矩阵类型
   */
  matrices: Matrix[];
}

/**
 * 定界框入参类型
 */
export type BoundingParam = Partial<BoundingType>;
