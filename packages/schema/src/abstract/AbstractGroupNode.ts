import { IAbstractNode } from './AbstractNode';
import { OmitFunction } from '../utils';

/**
 * 抽象分组节点的接口
 */
export interface IAbstractGroupNode extends IAbstractNode<IAbstractGroupNode> {
  /**
   * 包含的子级
   * @description
   * 排序为从前到后排序。
   *
   * 即数组的第一个子元素是屏幕的最下面一层，数组的最后一个子元素是最顶层。
   */
  children: Array<unknown>;
}

/**
 * 抽象分组节点的属性
 */
export type AbstractGroupNodeType = OmitFunction<IAbstractGroupNode>;

/**
 * 抽象分组节点的入参属性
 */
export type AbstractGroupNodeParams = Partial<AbstractGroupNodeType>;
