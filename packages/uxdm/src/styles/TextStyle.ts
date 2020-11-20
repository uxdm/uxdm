import {
  ITextStyle,
  TextHorizontalAlignType,
  TextStyleParams,
  TextStyleType,
  TextVerticalAlignType,
} from '@uxdm/schema';
import { Color } from './Color';
import { AbstractObject } from '../abstract';
import { getFirstFont } from '../utils';

/**
 * 文本样式
 * @category 样式
 * */
export class TextStyle extends AbstractObject implements ITextStyle {
  constructor(params?: TextStyleParams) {
    super(params);
    if (params) {
      const {
        color,
        fontFamily,
        fontWeight,
        lineHeight,
        letterSpacing,
        textTransform,
        textDecoration,
        textAlign,
        // @ts-ignore
        skipSystemFonts,
        fontSize,
      } = params;

      this.color = new Color(color);
      this.fontSize = fontSize || 14;

      this.lineHeight = lineHeight;
      this.letterSpacing = letterSpacing;

      this.textTransform = textTransform;
      this.textDecoration = textDecoration;
      this.textAlign = textAlign || 'Left';

      if (fontWeight) {
        this.fontWeight = fontWeight.toString();
      }

      if (fontFamily) {
        this.fontFamily = getFirstFont(fontFamily, skipSystemFonts);
      }
    }
  }

  color: Color = new Color();

  /**
   * 字体家族
   * */
  fontFamily: string = 'PingFang SC';

  /**
   * 字体大小
   * */
  fontSize: number = 14;

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
  fontWeight: string = '';

  /**
   * 字体变换
   *
   * 例如全部大写等
   * */
  textTransform: string = '';

  /**
   * 文本横向对齐
   * */
  textAlign: TextHorizontalAlignType = 'Left';

  /**
   * 文本纵向对齐
   */
  verticalAlign: TextVerticalAlignType = 'Top';

  /**
   * 文本装饰
   *
   * 例如 下划线、删除线等
   * */
  textDecoration: string;

  /**
   * 字体类型
   * */
  FONT_STYLES = {
    normal: false,
    italic: true,
    oblique: true,
  };

  toJSON(): TextStyleType {
    const json = super.toJSON();
    // @ts-ignore
    return {
      ...json,
    };
  }
}
