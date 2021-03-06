import {
  CircleNodeType,
  EllipseNodeType,
  RectangleNodeType,
  ShapeNodeType,
} from '../types';
import { CircleNode, EllipseNode, RectangleNode } from '../nodes';

/**
 * 从 JSON 重新生成节点
 */
export const fromJSON = (json: ShapeNodeType) => {
  switch (json.type) {
    case 'Group':
      break;
    case 'Rectangle':
      return RectangleNode.fromJSON(json as RectangleNodeType);
    case 'Line':
      break;
    case 'Artboard':
      break;
    case 'Page':
      break;
    case 'Frame':
      break;
    case 'Ellipse':
      return EllipseNode.fromJSON(json as EllipseNodeType);
    case 'Circle':
      return CircleNode.fromJSON(json as CircleNodeType);
    default:
  }
};
