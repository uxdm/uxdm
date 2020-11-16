import { Overwrite } from 'utility-types';
import { IAbstractObject } from '../abstract/AbstractObject';
import { ColorParams, ColorType, IColor } from './Color';
import { GradientParams, GradientType, IGradient } from './Gradient';
import { IImage, ImageType } from './Image';
import { OmitFunction } from '../utils';
import { BlendModeType } from '../constants';

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
  /**
   * 颜色
   */
  color: IColor;
  /**
   * 图片
   */
  image?: IImage;
  /**
   * 渐变参数
   */
  gradient: IGradient;
  /**
   * 透明度
   */
  opacity: number;
  /**
   * 混合模式
   */
  blendMode: BlendModeType;
}

export type PaintType = Overwrite<OmitFunction<IPaint>, BasePaintType>;

export type PaintParams = Partial<
  Overwrite<
    PaintType,
    {
      color?: ColorParams;
      gradient?: GradientParams;
      image?: string;
    }
  >
>;

export type BasePaintType = {
  color: ColorType;
  gradient: GradientType;
  image: ImageType;
};
