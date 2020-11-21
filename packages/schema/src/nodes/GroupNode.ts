import { IAbstractGroupNode } from '../abstract';
import { NodeParamsUtils, NodeTypeUtils } from '../utils';

/**
 * 抽象分组节点的接口
 */
export interface IGroupNode extends IAbstractGroupNode {}

export type GroupNodeType = NodeTypeUtils<IGroupNode>;

export type GroupNodeParams = NodeParamsUtils<GroupNodeType>;
