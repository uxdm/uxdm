import { Assign, DeepPartial, Overwrite } from 'utility-types';
import { IAbstractObject } from '../abstract';
import { ColorParams, ColorType, IColor } from './Color';
import { BlendModeType, Point } from '../constants';
import { OmitFunction } from '../utils';

export enum ShadowEnum {
  SHADOW = 'SHADOW',
  INNER_SHADOW = 'INNER_SHADOW',
}

export type Shadow_Type = keyof typeof ShadowEnum;

export interface IShadow extends IAbstractObject {
  /**
   * The string literal representing the type of effect this is.
   * Always check the type before reading other properties.
   */
  type: Shadow_Type;

  /**
   * 阴影是否可见
   */
  visible: boolean;

  /**
   * 颜色
   */
  color: IColor;

  /**
   * 模糊半径
   */
  blur: number;

  /**
   * 阴影偏移
   */
  offset: Point;

  /**
   * 扩散效果
   * @description
   * The distance by which to expand (or contract) the shadow.
   * For drop shadows, a positive spread value creates a shadow larger than the node,
   * whereas a negative value creates a shadow smaller than the node.
   * inner shadows, a positive spread value contracts the shadow.
   * spread values are only accepted on rectangles and ellipses, or on frames, components,
   * and instances with visible fill paints and clipsContent enabled.
   * When left unspecified, the default value is 0.
   */
  spread: number;

  /**
   * 混合模式
   */
  blendMode: BlendModeType;

  toJSON(): ShadowType;

  toParams(): ShadowParams;
}

export type ShadowType = Overwrite<OmitFunction<IShadow>, { color: ColorType }>;

export type ShadowParams = Assign<
  Overwrite<DeepPartial<Omit<ShadowType, 'offset'>>, { color?: ColorParams }>,
  { offsetX?: number; offsetY?: number }
>;
