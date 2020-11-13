import { Assign } from 'utility-types';
import { IAbstractNode, AbstractNodeType } from '../abstract';
import { OmitFunction } from '../utils';
import { BoundingParams } from '../objects';

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
}

export type EllipseNodeType = Assign<
  OmitFunction<IEllipseNode>,
  AbstractNodeType
>;

export type EllipseNodeParams = Partial<
  Assign<Omit<EllipseNodeType, 'type' | 'bounding'>, BoundingParams>
>;
