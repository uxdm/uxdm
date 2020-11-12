import { OmitFunction } from '../utils';
import { NodeType } from '../nodes';

/**
 * 抽象节点的属性
 */
export interface IAbstractNode<T = any> {
  /**
   * 表明节点的类型,每种节点都有
   */
  type: NodeType;

  /**
   * 克隆自身的方法
   */
  clone(): T;

  /**
   * 节点的内部标识符
   */
  id: string;

  /**
   * 节点的名称
   */
  name: string;

  /** **** 场景相关的能力 ***** * */

  /**
   * 节点是否可见。
   */
  visible: boolean;

  /**
   * 节点是否被锁定，防止在画布上进行某些用户交互，例如选择和拖动。
   */
  locked: boolean;

  /**
   *
   */

  /**
   * Returns a string representation of the node.
   */
  toString(): string;

  /**
   * 将属性输出为 json
   */
  toJSON(): AbstractNodeType;
}

/**
 * 抽象节点的属性
 */
export type AbstractNodeType = OmitFunction<IAbstractNode>;

/**
 * 抽象节点的入参
 */
export type AbstractNodeParams = Partial<AbstractNodeType>;
