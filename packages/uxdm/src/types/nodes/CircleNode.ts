import { Assign } from 'utility-types';
import { IAbstractNode } from '../abstract';
import { NodeParamsUtils, NodeTypeUtils } from '../utils';

/**
 * 正圆图形接口
 */
export interface ICircleNode extends IAbstractNode {
  /**
   * 半径
   */
  radius: number;

  toJSON(): CircleNodeType;
}

export type CircleNodeType = NodeTypeUtils<ICircleNode>;

export type CircleNodeParams = Assign<
  Omit<NodeParamsUtils<CircleNodeType>, 'width' | 'height'>,
  { cx?: number; cy?: number }
>;
