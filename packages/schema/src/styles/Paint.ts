import { Overwrite } from 'utility-types';
import { IAbstractObject } from '../abstract/AbstractObject';
import { ColorParams, ColorType, IColor } from './Color';
import { GradientParams, GradientType, IGradient } from './Gradient';
import { IImage, ImageType } from './Image';
import { OmitFunction } from '../utils';

export enum PaintEnum {
  SOLID = 'SOLID',
  GRADIENT = 'GRADIENT',
  IMAGE = 'IMAGE',
}
export type Paint_Type = keyof typeof PaintEnum;

export interface IPaint extends IAbstractObject {
  /**
   * 颜色名称
   */
  name: string;
  /**
   * 填充类型
   */
  type: Paint_Type;
  color: IColor;
  image?: IImage;
  gradient: IGradient;
  /**
   * 透明度
   */
  opacity: number;
}

export type PaintType = Overwrite<OmitFunction<IPaint>, BasePaintType>;

export type PaintParams = {
  color?: ColorParams;
  gradient?: GradientParams;
  image?: string;
};

export type BasePaintType = {
  color: ColorType;
  gradient: GradientType;
  image: ImageType;
};
