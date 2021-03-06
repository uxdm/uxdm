import { NodeParamsUtils, NodeTypeUtils } from '../utils';
import { LayoutConstraint, NodeType } from '../constants';
import { IAbstractObject } from './AbstractObject';
import { IBounding, ILayout, PositionParams } from '../objects';
import { IStyle } from '../styles';

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

  /**
   * 样式属性
   */
  style: IStyle;

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

  /**
   * 设置节点位置
   * @description 也可以传入 x y 的对象
   * @param x
   * @param y
   */
  // setPosition(x: number, y: number): void;

  /**
   * 设置节点位置
   * @description  透传 bounding 对象的 setPosition 方法
   * @param params
   */
  setPosition(params: PositionParams): void;
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
