export interface IColor {
  red: number;

  green: number;

  blue: number;

  alpha: number;

  toJSON(): ColorType;

  toParams(): ColorParams;
}

export type ColorType = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type ColorParams =
  // Color 对象
  | Partial<ColorType>
  // HEX值
  | string
  // 序号
  | number
  // 数组-> [r,g,b,a]
  | number[];
