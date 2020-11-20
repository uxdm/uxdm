import {
  BlendModeType,
  BorderOptionsParams,
  BorderOptionsType,
  BorderParams,
  ColorParams,
  FillParams,
  GradientParams,
  IStyle,
  ShadowParams,
  StyleParams,
} from '@uxdm/schema';
import { AbstractObject } from '../abstract';

import { Fill } from './Fill';

import { Shadow } from './Shadow';

import { Border } from './Border';

/**
 * 样式
 * @category 样式
 */
export class Style extends AbstractObject implements IStyle {
  constructor(params?: StyleParams) {
    super(params);
    if (params) {
      const {
        borders,
        shadows,
        borderOptions,
        fills,
        innerShadows,
        opacity,
        blendMode,
      } = params;

      if (borders) {
        this.borders = borders
          .filter((b) => b)
          .map((border) => new Border(border));
      }
      if (shadows) {
        this.shadows = shadows
          .filter((b) => b)
          .map((shadow) => new Shadow(shadow));
      }
      if (innerShadows) {
        this.innerShadows = innerShadows
          .filter((b) => b)
          .map(
            (innerShadow) =>
              new Shadow({ ...innerShadow, type: 'INNER_SHADOW' }),
          );
      }
      if (fills) {
        this.fills = fills.filter((b) => b).map((fill) => new Fill(fill));
      }
      if (borderOptions) {
        this.borderOptions = { ...this.borderOptions, ...borderOptions };
      }

      if (opacity) {
        this.opacity = Math.min(opacity, 1);
      }
      this.blendMode = blendMode || 'NORMAL';
    }
  }

  /**
   * 填充
   * */
  fills: Fill[] = [];

  /**
   * 外阴影
   * */
  shadows: Shadow[] = [];

  /**
   * 内阴影
   * */
  innerShadows: Shadow[] = [];

  /**
   * 描边
   * */
  borders: Border[] = [];

  /**
   * 描边属性
   * */
  borderOptions: BorderOptionsType = {
    align: 'INSIDE',
    lineJoin: 'MITER',
    lineCap: 'NONE',
    dashPattern: [],
    enabled: true,
  };

  /**
   * 混合模式
   */
  blendMode: BlendModeType = 'NORMAL';

  /**
   * 不透明度
   */
  opacity: number = 1;

  /**
   * 添加填充
   * @param params
   */
  addFill(params?: FillParams) {
    const fill = new Fill(params);
    this.fills.push(fill);
  }

  addFills(fillList: FillParams[]) {
    if (fillList.length === 0) return;

    fillList
      .filter((b) => b)
      .forEach((fillParam) => {
        const fill = new Fill(fillParam);
        this.fills.push(fill);
      });
  }

  /**
   * 添加颜色填充
   * */
  addColorFill(color: ColorParams) {
    const fill = new Fill({
      type: 'SOLID',
      color,
    });
    this.fills.push(fill);
  }

  /**
   * 添加渐变填充
   * */
  addGradientFill(params: GradientParams) {
    const fill = new Fill({
      type: 'GRADIENT',
      gradient: params,
    });

    this.fills.push(fill);
  }

  /**
   * 添加图片填充
   * */
  addImageFill(image: string) {
    const fill = new Fill({
      type: 'IMAGE',
      image,
    });
    this.fills.push(fill);
  }

  /**
   * 添加描边
   * */
  addBorder(params?: BorderParams) {
    const border = new Border(params);
    this.borders.push(border);
  }

  /**
   * 添加阴影
   * */
  addShadow(params?: ShadowParams) {
    const shadow = new Shadow({ ...params, type: 'SHADOW' });
    this.shadows.push(shadow);
  }

  /**
   * 添加内阴影
   * */
  addInnerShadow(params?) {
    const shadow = new Shadow({ ...params, type: 'INNER_SHADOW' });
    this.innerShadows.push(shadow);
  }

  /**
   * 设置描边属性
   * */
  setBorderDashed(params: BorderOptionsParams) {
    const { lineCap, lineJoin, align, dash, spacing, dashed } = params;
    if (lineCap) {
      this.borderOptions.lineCap = lineCap;
    }
    if (lineJoin) {
      this.borderOptions.lineJoin = lineJoin;
    }
    if (align) {
      this.borderOptions.align = align;
    }
    if (typeof dashed === 'boolean' && !dashed) {
      this.borderOptions.dashPattern = [];
    } else if (typeof dash === 'number' || typeof spacing === 'number') {
      if (dash === 0 && spacing === 0) {
        this.borderOptions.dashPattern = [];
      } else {
        this.borderOptions.dashPattern = [dash ?? 4, spacing ?? 4];
      }
    }
  }

  toJSON() {
    const json = super.toJSON();
    return {
      ...json,
      fills: this.fills.map((f) => f.toJSON()),
      borderOptions: this.borderOptions,
      innerShadows: this.innerShadows.map((s) => s.toJSON()),
      shadows: this.shadows.map((s) => s.toJSON()),
      borders: this.borders.map((b) => b.toJSON()),
      opacity: this.opacity,
      blendMode: this.blendMode,
    };
  }

  toParams(): StyleParams {
    return {
      blendMode: this.blendMode,
      fills: this.fills.map((item) => item.toParams()),
      shadows: this.shadows.map((item) => item.toParams()),
      borders: this.borders.map((item) => item.toParams()),
      innerShadows: this.innerShadows.map((item) => item.toParams()),
      opacity: this.opacity,
      borderOptions: this.borderOptions,
    };
  }
}
