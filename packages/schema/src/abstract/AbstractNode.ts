import { DeepPartial, Overwrite } from 'utility-types';
import { OmitFunction } from '../utils';
import { NodeType } from '../nodes';
import { IAbstractObject } from './AbstractObject';
import { ILayout, LayoutType } from '../objects';

/**
 * 抽象节点的属性
 */
export interface IAbstractNode<T = unknown> extends IAbstractObject {
  /**
   * 表明节点的类型,每种节点都有
   */
  type: NodeType;

  /**
   * 克隆自身的方法
   */
  clone(): T;

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
   * 定界框
   */

  // bounding:Bounding
}

/**
 * 抽象节点的属性
 */
export type AbstractNodeType = Overwrite<
  OmitFunction<IAbstractNode>,
  { layout: LayoutType }
>;

/**
 * 抽象节点的入参
 */
export type AbstractNodeParams = DeepPartial<AbstractNodeType>;
