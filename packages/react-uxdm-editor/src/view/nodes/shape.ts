import { CircleNode, EllipseNode, RectangleNode, NodeEnum } from 'uxdm';
import { Circle, Ellipse, Rectangle } from './shapes';
import { Group } from './index';

export const ShapeTypes = NodeEnum;

export const nodesMap = {
  [ShapeTypes.Ellipse]: Ellipse,
  [ShapeTypes.Circle]: Circle,
  [ShapeTypes.Rectangle]: Rectangle,
  [ShapeTypes.Group]: Group,
};

export const availableShapes = {
  [ShapeTypes.Ellipse]: () =>
    new EllipseNode({
      x: 100,
      y: 100,
      rx: 100,
      ry: 50,
      fill: 'blue',
    }),
  [ShapeTypes.Circle]: () =>
    new CircleNode({
      x: 100,
      y: 100,
      radius: 50,
      fill: 'red',
    }),
  [ShapeTypes.Rectangle]: () =>
    new RectangleNode({
      x: 50,
      y: 50,
      height: 100,
      width: 200,
      fill: 'black',
    }),
};
