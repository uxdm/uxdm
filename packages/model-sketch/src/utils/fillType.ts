import { Paint_Type } from '@uxdm/schema';
import { SketchFormat } from '../types';

export const getFillType = (type: Paint_Type) => {
  switch (type) {
    default:
    case 'SOLID':
      return SketchFormat.FillType.Color;

    case 'GRADIENT':
      return SketchFormat.FillType.Gradient;

    case 'IMAGE':
      return SketchFormat.FillType.Pattern;
  }
};
