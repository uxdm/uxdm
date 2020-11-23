import { ShapeTypes } from '../utils';
import { Circle, Ellipse, Rectangle } from '../canvas/shapes';

export const shapesMap = {
  [ShapeTypes.Ellipse]: Ellipse,
  [ShapeTypes.Circle]: Circle,
  [ShapeTypes.Rectangle]: Rectangle,
};
