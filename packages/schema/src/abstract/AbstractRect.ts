/**
 * 定界框类型
 */
export interface AbstractRectType {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * 矩形参数
 */
export type RectInitParam = Partial<AbstractRectType>;
