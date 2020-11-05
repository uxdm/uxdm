/**
 * 抽象矩形
 */
export interface AbstractRectType {
  /**
   * X 坐标
   * 默认方向是从左到右
   */
  x: number;
  /**
   * 笛卡尔坐标系的 Y 坐标
   * 默认方向是从上到下
   */
  y: number;
  /**
   * 矩形的宽度
   */
  width: number;
  /**
   * 矩形的高度
   */
  height: number;
}

/**
 * 矩形参数
 */
export type RectInitParam = Partial<AbstractRectType>;
