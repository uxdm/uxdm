import { EllipseNode, GroupNode, RectangleNode } from '../../nodes';

import {
  EllipseNodeParams,
  EllipseNodeType,
  GroupNodeParams,
  GroupNodeType,
  RectangleNodeParams,
  RectangleNodeType,
} from '../nodes';

/**
 * 节点类型
 * @description
 */
export enum NodeEnum {
  Group = 'Group',
  Rectangle = 'Rectangle',
  Line = 'Line',
  Artboard = 'Artboard',
  'Page' = 'Page',
  Frame = 'Frame',
  Ellipse = 'Ellipse',
  Circle = 'Circle',
}

export type NodeType = keyof typeof NodeEnum;

export type ChildNode = RectangleNode | GroupNode | EllipseNode;

export type ShapeNode = RectangleNode | EllipseNode;

export type ShapeNodeType = RectangleNodeType | EllipseNodeType;

export type ChildNodeType = RectangleNodeType | GroupNodeType | EllipseNodeType;

export type ChildrenHelper<T> = T extends ShapeNodeType ? never : GroupNodeType;

export type GroupChildrenType = ChildrenHelper<ChildNodeType>[];

export type ChildNodeParams =
  | RectangleNodeParams
  | GroupNodeParams
  | EllipseNodeParams;
