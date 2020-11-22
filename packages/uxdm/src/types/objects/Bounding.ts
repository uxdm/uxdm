import { AbstractRectType } from '../abstract';
import { Matrix, Point } from '../constants';

export interface IBounding extends AbstractRectType {
  /**
   * 旋转参数
   */
  rotation: number;
  /**
   * 矩阵类型
   */
  matrices: Matrix[];

  /**
   * 是否维持比例
   */
  constrainProportions: boolean;

  /**
   * 横轴中点
   */
  centerX: number;

  /**
   * 纵轴中点
   */
  centerY: number;
}

/**
 * 定界框输出类型
 */
export interface BoundingType extends AbstractRectType {
  /**
   * 旋转参数
   */
  rotation: number;
}

/**
 * 定界框入参类型
 */
export type BoundingParams = Partial<BoundingType>;

export type PositionType = Point;

export type PositionParams = Partial<Point>;
