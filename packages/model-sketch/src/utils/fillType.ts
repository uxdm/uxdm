import { Paint_Type } from 'uxdm';
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

/**
 * 从 Sketch 获取颜料类型
 * @param fillType
 */
export const fromSketchFillType = (
  fillType: SketchFormat.FillType,
): Paint_Type => {
  switch (fillType) {
    default:
    case SketchFormat.FillType.Color:
      return 'SOLID';

    case SketchFormat.FillType.Gradient:
      return 'GRADIENT';

    case SketchFormat.FillType.Pattern:
      return 'IMAGE';
  }
};
