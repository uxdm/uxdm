import { IAbstractObject } from '../abstract/AbstractObject';
import { ColorParams, ColorType, IColor } from './Color';
import { GradientParams, GradientType, IGradient } from './Gradient';
import { IImage, ImageType } from './Image';

export enum PaintEnum {
  SOLID = 'SOLID',
  GRADIENT = 'GRADIENT',
  IMAGE = 'IMAGE',
}
export type PaintType = keyof typeof PaintEnum;

export interface IPaint extends IAbstractObject {
  /**
   * 颜色名称
   */
  name: string;
  /**
   * 填充类型
   */
  type: PaintType;
  color: IColor;
  image?: IImage;
  gradient: IGradient;
  /**
   * 透明度
   */
  opacity: number;
}

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
