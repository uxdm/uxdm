import { StyleParams, WindingRuleType } from '@uxdm/schema';
import { Style as BaseStyle } from 'uxdm';
import Fill from './Fill';
import Shadow from './Shadow';
import Border from './Border';

import { defaultColorControls, getContextSettings, uuid } from '../utils';

import { SketchFormat } from '../types';

/**
 * 样式
 */
class Style extends BaseStyle {
  constructor(params?: StyleParams) {
    super(params);

    this.fills = this.fills.map((item) => new Fill(item.toParams()));
    this.borders = this.borders.map((item) => new Border(item.toParams()));
    this.shadows = this.shadows.map((item) => new Shadow(item.toParams()));
    this.innerShadows = this.innerShadows.map(
      (item) => new Shadow(item.toParams()),
    );

    this.id = uuid();
  }

  get SketchBorderOptions(): SketchFormat.BorderOptions {
    let lineCapStyle: SketchFormat.LineCapStyle;
    let lineJoinStyle: SketchFormat.LineJoinStyle;
    switch (this.borderOptions.lineCap) {
      default:
      case 'NONE':
        lineCapStyle = SketchFormat.LineCapStyle.Butt;
        break;
      case 'ROUND':
        lineCapStyle = SketchFormat.LineCapStyle.Round;
        break;
      case 'SQUARE':
        lineCapStyle = SketchFormat.LineCapStyle.Projecting;
        break;
    }

    switch (this.borderOptions.lineJoin) {
      default:
      case 'MITER':
        lineJoinStyle = SketchFormat.LineJoinStyle.Miter;
        break;
      case 'BEVEL':
        lineJoinStyle = SketchFormat.LineJoinStyle.Bevel;
        break;
      case 'ROUND':
        lineJoinStyle = SketchFormat.LineJoinStyle.Round;
        break;
    }

    return {
      _class: 'borderOptions',
      isEnabled: this.borderOptions.enabled,
      dashPattern: this.borderOptions.dashPattern,
      lineCapStyle,
      lineJoinStyle,
    };
  }

  fills: Fill[];

  borders: Border[];

  shadows: Shadow[];

  innerShadows: Shadow[];

  /**
   * 描边斜接面限制比例
   *
   * @see https://www.yuque.com/arvinxx-fe/svg/1ccebd45-74b5-4346-a640-41ac5585fc20
   */
  miterLimit: number = 10;

  /**
   * 描边两端终点形状
   * @description
   * sketch 专有属性
   */
  endMarkerType: SketchFormat.MarkerType = SketchFormat.MarkerType.OpenArrow;

  /**
   * 描边两端起点形状
   * @description
   * sketch 专有属性
   */
  startMarkerType: SketchFormat.MarkerType = SketchFormat.MarkerType.OpenArrow;

  /**
   * 填充的奇偶缠绕规则
   * @description
   * 详见
   *
   * @see https://www.yuque.com/arvinxx-fe/svg/7ad6671c-d309-40fc-a0a8-55888f508289
   * @see https://oreillymedia.github.io/Using_SVG/extras/ch06-fill-rule.html
   */
  windingRule: WindingRuleType = 'EVENODD';

  get SketchWindingRule() {
    switch (this.windingRule) {
      case 'NONZERO':
        return SketchFormat.WindingRule.NonZero;
      default:
      case 'EVENODD':
      case 'NONE':
        return SketchFormat.WindingRule.EvenOdd;
    }
  }

  /**
   * 生成 Sketch JSON 对象
   */
  toSketchJSON(): SketchFormat.Style {
    return {
      _class: 'style',
      do_objectID: this.id,
      endMarkerType: this.endMarkerType,
      startMarkerType: this.startMarkerType,
      miterLimit: this.miterLimit,
      windingRule: this.SketchWindingRule,
      borderOptions: this.SketchBorderOptions,
      colorControls: defaultColorControls,
      fills: this.fills.map((item) => item.toSketchJSON()),
      borders: this.borders.map((b) => b.toSketchJSON()),
      shadows: this.shadows.map(
        (shadow) => shadow.toSketchJSON() as SketchFormat.Shadow,
      ),
      innerShadows: this.innerShadows.map(
        (i) => i.toSketchJSON() as SketchFormat.InnerShadow,
      ),
      contextSettings: getContextSettings(this.blendMode, this.opacity),
    };
  }
}

export default Style;
