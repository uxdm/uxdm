/**
 * 约束参数
 *
 * @category 布局
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

/**
 * @category 布局
 */
export type ConstraintType = keyof typeof ConstraintEnum;

/**
 * 布局约束
 * @category 布局
 */
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
/**
 * @category 布局
 */
export type PaddingValue = number | number[];

/**
 * 任何一个容器支持的布局模式
 * @category 布局
 */
export const enum LayoutModeEnum {
  FLEXBOX = 'FLEXBOX',
  GRID = 'GRID',
  FREE = 'FREE',
}
/**
 * @category 布局
 */
export type LayoutModeType = keyof typeof LayoutModeEnum;

/**
 * 自身在容器中的布局模式
 * @category 布局
 */
export const enum SelfLayoutMode {
  /**
   * 采用父级的布局模式
   */
  Auto = 'Auto',
  /**
   * 使用自由模式
   * @description
   * 自由模式将不使用父级的布局模式 类似 web 中使用
   * `position: absolute` 或者 `float: left` 的效果
   *
   * 该模式主要适用场景: 个别元素不跟随容器自动布局.
   * 例如角标 说明文本等等
   */
  Free = 'Free',
}
/**
 * @category 布局
 */
export type SelfLayoutModeType = keyof typeof SelfLayoutMode;
