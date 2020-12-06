import { Overwrite } from 'utility-types';
import { IColor, ColorParams, ColorType } from './Color';
import { Point } from '../constants';
import { OmitFunction } from '../utils';

export enum GradientEnum {
  LINEAR = 'LINEAR',
  RADIAL = 'RADIAL',
  ANGULAR = 'ANGULAR',
}

export type Gradient_Type = keyof typeof GradientEnum;

export interface IGradient {
  type: Gradient_Type;
  from: Point;
  to: Point;
  stops: ColorStop[];
  radius?: number;
  toJSON(): GradientType;
  toParams(): GradientParams;
}

export type GradientType = Overwrite<
  Partial<OmitFunction<IGradient>>,
  { stops: { color: ColorType; position: number }[] }
>;

export type GradientParams = {
  from?: Point;
  to?: Point;
  stops?: ColorStopParams[];
  type?: Gradient_Type;
  radius?: number;
};

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
  | IColor
  | ColorParams
  | {
      position?: number;
      color: IColor | ColorParams;
    };
