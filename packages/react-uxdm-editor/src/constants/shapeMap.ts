import { ShapeTypes } from '@rue/utils';
import { Circle, Ellipse, Rectangle } from '@rue/canvas/shapes';

export const shapesMap = {
  [ShapeTypes.Ellipse]: Ellipse,
  [ShapeTypes.Circle]: Circle,
  [ShapeTypes.Rectangle]: Rectangle,
};
