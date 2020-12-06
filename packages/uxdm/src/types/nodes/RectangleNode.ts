import { IAbstractNode } from '../abstract';
import { NodeParamsUtils, NodeTypeUtils } from '../utils';

/**
 * 抽象分组节点的接口
 */
export interface IRectangleNode extends IAbstractNode {
  /**
   * 圆角参数
   */
  cornerRadius: number;
}

export type RectangleNodeType = NodeTypeUtils<IRectangleNode>;

// @ts-ignore
export type RectangleNodeParams = NodeParamsUtils<RectangleNodeType>;
