import { Overwrite } from 'utility-types';
import { IColor, ColorParams, ColorType } from './Color';
import { Point } from '../constants';

export enum GradientEnum {
  LINEAR = 'LINEAR',
  RADIAL = 'RADIAL',
  ANGULAR = 'ANGULAR',
}

export type GradientTypes = keyof typeof GradientEnum;

export interface IGradient {
  type: GradientTypes;
  from: Point;
  to: Point;
  radius?: number;
  stops: ColorStop[];
}

export interface ColorStop {
  /**
   * 偏移位置 取值 0-1
   */
  position: number;
  /**
   * 颜色对象
   */
  color: IColor;
}

export type ColorStopParams =
  | ColorParams
  | {
      position?: number;
      color: ColorParams;
    };

export type GradientType = Overwrite<
  Partial<IGradient>,
  { stops: { color: ColorType; position: number }[] }
>;

export type GradientParams = {
  from?: Point;
  to?: Point;
  stops?: ColorStopParams[];
  type?: GradientTypes;
  radius?: number;
};
