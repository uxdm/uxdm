import { SketchFormat } from '../types';

export const defaultExportOptions: SketchFormat.ExportOptions = {
  _class: 'exportOptions',
  includedLayerIds: [],
  layerOptions: 0,
  shouldTrim: false,
  exportFormats: [],
};

/**
 * SKetch默认的色彩控制
 * */
export const defaultColorControls: SketchFormat.ColorControls = {
  _class: 'colorControls',
  isEnabled: false,
  brightness: 0,
  contrast: 1,
  hue: 0,
  saturation: 1,
};

/**
 * SKetch 默认规则数据
 * */
export const defaultRuleData: SketchFormat.RulerData = {
  _class: 'rulerData',
  base: 0,
  guides: [],
};

/**
 * SKetch 默认blend 样式
 * */
export const defaultContextSettings: SketchFormat.GraphicsContextSettings = {
  _class: 'graphicsContextSettings',
  blendMode: SketchFormat.BlendMode.Normal,
  opacity: 1,
};

export const defaultGradient: SketchFormat.Gradient = {
  _class: 'gradient',
  elipseLength: 0,
  from: '0 0',
  to: '1 0',
  stops: [],
  gradientType: SketchFormat.GradientType.Linear,
};

export const defaultNodeStyle: Partial<CSSStyleDeclaration> = {
  backgroundColor: 'rgba(0, 0, 0, 0)',
  backgroundImage: 'none',
  borderWidth: '0px',
  boxShadow: 'none',
  // verticalAlign: 'baseline',
};
