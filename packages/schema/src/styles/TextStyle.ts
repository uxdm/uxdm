import { Overwrite } from 'utility-types';
import { IAbstractObject } from '../abstract';
import { ColorParams, IColor } from './Color';
import { OmitFunction } from '../utils';

export enum TextHorizontalAlignEnum {
  Left = 'Left',
  Right = 'Right',
  Center = 'Center',
  Justify = 'Justify',
}
export type TextHorizontalAlignType = keyof typeof TextHorizontalAlignEnum;

export enum TextVerticalAlignEnum {
  Top = 'Top',
  Middle = 'Middle',
  Bottom = 'Bottom',
}
export type TextVerticalAlignType = keyof typeof TextVerticalAlignEnum;

/**
 * 文本样式
 */
export interface ITextStyle extends IAbstractObject {
  /**
   * 字体颜色
   */
  color: IColor;

  /**
   * 字体家族
   * */
  fontFamily: string;

  /**
   * 字体大小
   * */
  fontSize: number;

  /**
   * 行高
   * */
  lineHeight: number;

  /**
   * 字宽
   * */
  letterSpacing: number;

  /**
   * 字重
   */
  fontWeight: string;

  /**
   * 字体变换
   *
   * 例如全部大写等
   * */
  textTransform: string;

  /**
   * 文本横向对齐
   * */
  textAlign: TextHorizontalAlignType;

  /**
   * 文本纵向对齐
   */
  verticalAlign: TextVerticalAlignType;

  /**
   * 文本装饰
   *
   * 例如 下划线、删除线等
   * */
  textDecoration: string;

  /**
   * 字体类型
   * */
  FONT_STYLES;
}

export type TextStyleType = OmitFunction<ITextStyle>;

export type TextStyleParams = Partial<
  Overwrite<TextStyleType, { color: ColorParams }>
>;
