import { IAbstractGroupNode } from '../abstract';
import { OmitFunction } from '../utils';

/**
 * 抽象分组节点的接口
 */
export interface IGroupNode extends IAbstractGroupNode {
  /**
   * 单纯为了测试 group 属性
   */
  testGroup: string;
}

export type GroupNodeType = OmitFunction<IGroupNode>;

export type GroupNodeParams = Partial<GroupNodeType>;
