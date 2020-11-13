/**
 * 调整尺寸变量基础参数
 */
export enum ResizingConstraint {
  /**
   * 无
   */
  None = 63,
  /**
   * 上
   */
  Top = 31,
  /**
   * 右
   */
  Right = 62,
  /**
   * 下
   */
  Bottom = 55,
  /**
   * 左
   */
  Left = 59,
  /**
   * 定宽度
   */
  Width = 61,
  /**
   * 定高度
   */
  Height = 47,
}

/**
 * 智能布局参数
 */
export const GroupLayout = {
  LEFT_TO_RIGHT: 'LEFT_TO_RIGHT',
  HORIZONTALLY_CENTER: 'HORIZONTALLY_CENTER',
  RIGHT_TO_LEFT: 'RIGHT_TO_LEFT',
  TOP_TO_BOTTOM: 'TOP_TO_BOTTOM',
  VERTICALLY_CENTER: 'VERTICALLY_CENTER',
  BOTTOM_TO_TOP: 'BOTTOM_TO_TOP',
};
