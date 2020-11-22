/**
 * 从 JSON 重新生成节点
 */
import { ShapeNodeType } from '../types';
import { EllipseNode } from '../nodes';

export const fromJSON = (json: ShapeNodeType) => {
  switch (json.type) {
    case 'Group':
      break;
    case 'Rectangle':
      break;
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
      break;
    case 'Circle':
      break;
    default:
  }
};
