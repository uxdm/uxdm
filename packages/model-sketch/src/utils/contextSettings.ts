import { BlendModeType } from '@uxdm/schema';
import { SketchFormat } from '../types';

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
