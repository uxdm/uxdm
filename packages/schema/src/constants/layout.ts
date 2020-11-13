/**
 * 约束参数
 */
export enum ConstraintEnum {
  /**
   * 约束左侧或顶部
   */
  MIN = 'MIN',
  /**
   * 居中约束
   */
  CENTER = 'CENTER',
  /**
   * 约束右侧或底部
   */
  MAX = 'MAX',
  /**
   * 约束左右宽度或上下宽度
   */
  STRETCH = 'STRETCH',
  /**
   * 跟随容器缩放
   */
  SCALE = 'SCALE',
}

export type ConstraintType = keyof typeof ConstraintEnum;

export interface LayoutConstraint {
  /**
   * 横轴约束
   */
  vertical: ConstraintType;
  /**
   * 纵轴约束
   */
  horizontal: ConstraintType;
}

export type PaddingValue = number | number[];

/**
 * 任何一个容器支持的布局模式
 */
export const enum LayoutModeEnum {
  FLEXBOX = 'FLEXBOX',
  GRID = 'GRID',
  FREE = 'FREE',
}
export type LayoutModeType = keyof typeof LayoutModeEnum;
/**
 * 任何一个容器支持的布局模式
 */
export const enum SelfLayoutMode {
  /**
   * 采用父级的布局模式
   */
  Auto = 'Auto',
  /**
   * 使用自由模式
   */
  Free = 'Free',
}
