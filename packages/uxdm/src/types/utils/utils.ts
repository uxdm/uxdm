import { Assign, DeepPartial, OmitByValue, Overwrite } from 'utility-types';
import {
  BoundingParams,
  BoundingType,
  ContainerLayoutType,
  LayoutParams,
  LayoutType,
} from '../objects';
import {
  // AbstractGroupNodeType,
  AbstractNodeType,
  IAbstractGroupNode,
  IAbstractObject,
} from '../abstract';
import { ColorParams, StyleParams, StyleType } from '../styles';
// import { ChildNode, ChildNodeType } from '../constants';

/**
 *
 * 排除类中包含的所有工具类型
 * @description
 * 排除类中所有函数的参数
 */
export type OmitFunction<T> = OmitByValue<T, Function>;

/**
 * @description 统一给传入的类型节点调整类型 type
 * 去掉不必要的 Function
 */
export type NodeTypeUtils<T extends IAbstractObject> = Overwrite<
  OmitFunction<
    // 除掉约束
    Omit<T, 'constraints'>
  >,
  {
    layout: T extends IAbstractGroupNode ? ContainerLayoutType : LayoutType;
    bounding: BoundingType;
    style: StyleType;
    // 如果是 group 类型 重载成 ChildNodeType
    // children: T extends IAbstractGroupNode ? ChildNodeType[] : never;
  }
>;

/**
 * @description 统一给传入的类型节点调整 params 参数
 * 去掉不必要的 type 属性
 * 然后将 bounding 的参数能拉平到第一层级
 */
export type NodeParamsUtils<T extends AbstractNodeType> =
  // 允许使用 fill 的入参来添加单个颜色
  Assign<
    DeepPartial<
      // 覆盖掉样式参数
      Overwrite<
        // 将 constraints 参数加到变量中
        Assign<
          // 移除 bounding 参数
          // 将 width height 变成同一级
          Assign<Omit<T, 'type'>, BoundingParams>,
          // 从 layout 中取出来
          Pick<LayoutParams, 'constraints'>
        >,
        {
          style: StyleParams;
        }
      >
    >,
    {
      fill?: ColorParams;
      // border?
      // 如果是 Group 类型的Type 则让参数中有可以有 children
      // children?: T extends AbstractGroupNodeType ? ChildNode[] : never;
    }
  >;
