import { BlendModeType } from 'uxdm';
import { SketchFormat } from '../types';

/**
 * 将 UXDM 的 BlendMode 转换为 Sketch 的 BlendMode
 * @param blendMode
 */
export const getSketchBlendMode = (blendMode: BlendModeType) => {
  switch (blendMode) {
    case 'MULTIPLY':
      return SketchFormat.BlendMode.Multiply;
    case 'LINEAR_BURN':
      return SketchFormat.BlendMode.PlusDarker;
    case 'LINEAR_DODGE':
      return SketchFormat.BlendMode.PlusLighter;
    case 'OVERLAY':
      return SketchFormat.BlendMode.Overlay;
    case 'LUMINOSITY':
      return SketchFormat.BlendMode.Luminosity;
    case 'COLOR':
      return SketchFormat.BlendMode.Color;
    case 'COLOR_BURN':
      return SketchFormat.BlendMode.ColorBurn;
    case 'COLOR_DODGE':
      return SketchFormat.BlendMode.ColorDodge;
    default:
    case 'NORMAL':
    case 'PASS_THROUGH':
      return SketchFormat.BlendMode.Normal;
    case 'DARKEN':
      return SketchFormat.BlendMode.Darken;
    case 'DIFFERENCE':
      return SketchFormat.BlendMode.Difference;
    case 'EXCLUSION':
      return SketchFormat.BlendMode.Exclusion;
    case 'HARD_LIGHT':
      return SketchFormat.BlendMode.HardLight;
    case 'HUE':
      return SketchFormat.BlendMode.Hue;
    case 'LIGHTEN':
      return SketchFormat.BlendMode.Lighten;
    case 'SOFT_LIGHT':
      return SketchFormat.BlendMode.SoftLight;
    case 'SCREEN':
      return SketchFormat.BlendMode.Screen;
    case 'SATURATION':
      return SketchFormat.BlendMode.Saturation;
  }
};
/**
 * 从 Sketch 的 BlendMode 获得UXDM 的 BlendMode
 * @param blendMode
 */
export const fromSketchBlendMode = (
  blendMode: SketchFormat.BlendMode,
): BlendModeType => {
  switch (blendMode) {
    default:
    case SketchFormat.BlendMode.Normal:
      return 'NORMAL';

    // TODO PlusDarker 是啥
    case SketchFormat.BlendMode.PlusDarker:
    case SketchFormat.BlendMode.Darken:
      return 'DARKEN';
    case SketchFormat.BlendMode.Multiply:
      return 'MULTIPLY';
    case SketchFormat.BlendMode.ColorBurn:
      return 'COLOR_BURN';

    // TODO PlusLighter 是啥
    case SketchFormat.BlendMode.PlusLighter:
    case SketchFormat.BlendMode.Lighten:
      return 'LIGHTEN';
    case SketchFormat.BlendMode.Screen:
      return 'SCREEN';
    case SketchFormat.BlendMode.ColorDodge:
      return 'COLOR_DODGE';
    case SketchFormat.BlendMode.Overlay:
      return 'OVERLAY';
    case SketchFormat.BlendMode.SoftLight:
      return 'SOFT_LIGHT';
    case SketchFormat.BlendMode.HardLight:
      return 'HARD_LIGHT';
    case SketchFormat.BlendMode.Difference:
      return 'DIFFERENCE';
    case SketchFormat.BlendMode.Exclusion:
      return 'EXCLUSION';
    case SketchFormat.BlendMode.Hue:
      return 'HUE';
    case SketchFormat.BlendMode.Saturation:
      return 'SATURATION';
    case SketchFormat.BlendMode.Color:
      return 'COLOR';
    case SketchFormat.BlendMode.Luminosity:
      return 'LUMINOSITY';
  }
};

/**
 * 转换为符合 Sketch格式的 的 ContextSettings
 * @param blendMode
 * @param opacity
 */
export const getContextSettings = (
  blendMode: BlendModeType,
  opacity: number,
): SketchFormat.GraphicsContextSettings => {
  return {
    _class: 'graphicsContextSettings',
    blendMode: getSketchBlendMode(blendMode),
    opacity,
  };
};
