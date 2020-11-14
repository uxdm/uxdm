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
export type PaintType = keyof typeof PaintEnum;

export interface IFill extends IAbstractObject {
  type: PaintType;
  name: string;
  color: IColor;
  image?: IImage;
  gradient: IGradient;
}

export type FillType = Overwrite<
  OmitFunction<IFill>,
  { color: ColorType; gradient: GradientType; image: ImageType }
>;

export type FillParams = Overwrite<
  Partial<FillType>,
  { color?: ColorParams; gradient?: GradientParams; image?: string }
>;
