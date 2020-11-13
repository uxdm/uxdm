import { Assign } from 'utility-types';
import { IAbstractNode, AbstractNodeType } from '../abstract';
import { OmitFunction } from '../utils';

/**
 * 抽象分组节点的接口
 */
export interface IRectangleNode extends IAbstractNode {
  /**
   * 圆角参数
   */
  cornerRadius: number;
}

export type RectangleNodeType = Assign<
  OmitFunction<IRectangleNode>,
  AbstractNodeType
>;

export type RectangleNodeParams = Partial<Omit<RectangleNodeType, 'type'>>;
