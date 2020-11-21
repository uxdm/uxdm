import { NodeParamsUtils, NodeTypeUtils } from '../utils';
import { LayoutConstraint, NodeType } from '../constants';
import { IAbstractObject } from './AbstractObject';
import { IBounding, ILayout } from '../objects';

/**
 * 抽象节点的属性
 * @category 抽象对象
 */
export interface IAbstractNode<T = unknown> extends IAbstractObject {
  /**
   * 节点的类型
   * @description 每种节点都有
   */
  type: NodeType;

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
   * 布局类型
   */
  layout: ILayout;

  /**
   * 约束参数
   */
  constraints: LayoutConstraint;

  /**
   * 定界框
   */
  bounding: IBounding;

  /**
   * 克隆自身的方法
   */
  clone(): T;
}

/**
 * 抽象节点的属性
 * @category 抽象对象
 */
export type AbstractNodeType = NodeTypeUtils<IAbstractNode>;

/**
 * 抽象节点的入参
 * @category 抽象对象
 */
export type AbstractNodeParams = NodeParamsUtils<AbstractNodeType>;
