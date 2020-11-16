import { TextStyle as BaseTextStyle } from 'uxdm';

import { FONT_WEIGHTS } from '../constants';
import { SketchFormat } from '../types';

/**
 * 文本样式
 */
class TextStyle extends BaseTextStyle {
  /**
   * 取得 sketch 下的横向对齐参数
   */
  get sketchHorizontalAlign(): SketchFormat.TextHorizontalAlignment {
    switch (this.textAlign) {
      case 'Left':
      default:
        return SketchFormat.TextHorizontalAlignment.Left;
      case 'Right':
        return SketchFormat.TextHorizontalAlignment.Right;
      case 'Center':
        return SketchFormat.TextHorizontalAlignment.Centered;
      case 'Justify':
        return SketchFormat.TextHorizontalAlignment.Justified;
    }
  }

  /**
   * 取得 sketch 下的纵向对齐参数
   */
  get sketchVerticalAlign(): SketchFormat.TextVerticalAlignment {
    switch (this.verticalAlign) {
      case 'Top':
      default:
        return SketchFormat.TextVerticalAlignment.Top;
      case 'Middle':
        return SketchFormat.TextVerticalAlignment.Middle;
      case 'Bottom':
        return SketchFormat.TextVerticalAlignment.Bottom;
    }
  }

  /**
   * 取得 sketch 下的文本变化属性
   */
  get sketchTextTransform(): SketchFormat.TextTransform {
    switch (this.textTransform?.toLowerCase()) {
      case 'uppercase':
        return SketchFormat.TextTransform.Uppercase;
      case 'lowercase':
        return SketchFormat.TextTransform.Lowercase;
      default:
        return SketchFormat.TextTransform.None;
    }
  }

  /**
   * 获取下划线参数
   */
  get sketchUnderlineStyle() {
    if (this.textDecoration === 'underline')
      return SketchFormat.UnderlineStyle.Underlined;
    return SketchFormat.UnderlineStyle.None;
  }

  /**
   * 获取下划线参数
   */
  get sketchStrikeThroughStyle() {
    if (this.textDecoration === 'line-through') return 1;
    return 0;
  }

  /**
   * 修正字体家族信息
   * */
  get sketchFontFamilyInfo(): string {
    const weight = this.fontWeight;
    const defaultFontFamily = 'PingFangSC';

    const defaultFontWeight = FONT_WEIGHTS.normal;

    let fontWeight = weight ? FONT_WEIGHTS[weight] : defaultFontWeight;
    // Default to PingFangSC if fonts are missing

    // let isItalic = false;

    // let isCondensed = false;

    const familyName: string = defaultFontFamily;
    // if (family && family !== '-apple-system') {
    // familyName = family;
    // }

    // 针对苹方的字体 处理下 bold 的问题
    if (familyName === defaultFontFamily) {
      if (fontWeight === 'Bold') {
        fontWeight = 'Semibold';
      }
    }

    // if (fontStyle) {
    //   isItalic = this.FONT_STYLES[fontStyle] || false;
    // }

    // console.log('是否斜体:', isItalic);
    // return `${familyName}-${fontWeight}`;
    return `${familyName}-${fontWeight}`;
  }

  /**
   * 转为 Sketch JSON对象
   */
  toSketchJSON = (): SketchFormat.TextStyle => {
    return {
      _class: 'textStyle',
      verticalAlignment: this.sketchVerticalAlign,
      encodedAttributes: {
        underlineStyle: this.sketchUnderlineStyle,
        MSAttributedStringTextTransformAttribute: this.sketchTextTransform,
        paragraphStyle: {
          _class: 'paragraphStyle',
          alignment: this.sketchHorizontalAlign,
          maximumLineHeight: this.lineHeight || 22,
          minimumLineHeight: this.lineHeight || 22,
        },
        /**
         * 字宽
         * */
        kerning: this.letterSpacing || 0,
        strikethroughStyle: this.sketchStrikeThroughStyle,
        MSAttributedStringFontAttribute: {
          _class: 'fontDescriptor',
          attributes: {
            name: this.sketchFontFamilyInfo,
            size: this.fontSize,
          },
        },
        // @ts-ignore
        MSAttributedStringColorAttribute: this.color.toSketchJSON(),
      },
    };
  };
}

export default TextStyle;
