import { ShapeNodeType } from '../types';
import { EllipseNode, RectangleNode } from '../nodes';

/**
 * 从 JSON 重新生成节点
 */
export const fromJSON = (json: ShapeNodeType) => {
  switch (json.type) {
    case 'Group':
      break;
    case 'Rectangle':
      return RectangleNode.fromJSON(json);
    case 'Line':
      break;
    case 'Artboard':
      break;
    case 'Page':
      break;
    case 'Frame':
      break;
    case 'Ellipse':
      return EllipseNode.fromJSON(json);
    case 'Circle':
      break;
    default:
  }
};
