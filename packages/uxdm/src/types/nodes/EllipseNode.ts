import { IAbstractNode } from '../abstract';
import { NodeParamsUtils, NodeTypeUtils } from '../utils';

/**
 * 抽象分组节点的接口
 */
export interface IEllipseNode extends IAbstractNode {
  /**
   * 中心 X
   */
  cx: number;
  /**
   * 中心 Y
   */
  cy: number;
  /**
   * X 轴半径
   */
  rx: number;
  /**
   * Y 轴半径
   */
  ry: number;

  toJSON(): EllipseNodeType;
}

export type EllipseNodeType = NodeTypeUtils<IEllipseNode>;

export type EllipseNodeParams = NodeParamsUtils<EllipseNodeType>;
