export interface IColor {
  red: number;

  green: number;

  blue: number;

  alpha: number;

  toJSON(): ColorType;
}

export type ColorType = {
  r: number;
  g?: number;
  b?: number;
  a?: number;
  hex?: string;
};

export type ColorParams =
  // Color 对象
  | ColorType
  // HEX值
  | string
  // 序号
  | number
  // 数组-> [r,g,b,a]
  | number[];
