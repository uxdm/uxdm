import { CircleNode, EllipseNode, GroupNode, RectangleNode } from '../../nodes';

import {
  CircleNodeType,
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

/**
 * 所有可以作为图层的节点
 */
export type LayerNode = ChildNode;

export type ChildNode = ShapeNode | GroupNode;

export type ShapeNode = RectangleNode | EllipseNode | CircleNode;

export type ShapeNodeType =
  | RectangleNodeType
  | EllipseNodeType
  | CircleNodeType;

export type ChildNodeType = ShapeNodeType | GroupNodeType;

export type ChildrenHelper<T> = T extends ShapeNodeType ? never : GroupNodeType;

export type GroupChildrenType = ChildrenHelper<ChildNodeType>[];

export type ChildNodeParams =
  | RectangleNodeParams
  | GroupNodeParams
  | EllipseNodeParams;
