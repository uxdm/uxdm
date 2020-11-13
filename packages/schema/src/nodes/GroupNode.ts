import { Assign, DeepPartial } from 'utility-types';
import { AbstractGroupNodeType, IAbstractGroupNode } from '../abstract';
import { OmitFunction } from '../utils';

/**
 * 抽象分组节点的接口
 */
export interface IGroupNode extends IAbstractGroupNode {}

export type GroupNodeType = Assign<
  OmitFunction<IGroupNode>,
  AbstractGroupNodeType
>;

export type GroupNodeParams = DeepPartial<GroupNodeType>;