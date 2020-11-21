import { Assign, DeepPartial, OmitByValue } from 'utility-types';
import { BoundingParams } from '../objects';
import { AbstractGroupNodeType } from '../abstract';

/**
 *
 * 排除类中包含的所有工具类型
 * @description
 * 排除类中所有函数的参数
 */
export type OmitFunction<T> = OmitByValue<T, Function>;

/**
 * @description 统一给传入的 group 类型节点调整 params 参数
 * 去掉不必要的 type 属性
 * 然后将 bounding 的参数能拉平到第一层级
 */
export type GroupParamsUtils<T extends AbstractGroupNodeType> = DeepPartial<
  Assign<Omit<T, 'type' | 'bounding'>, BoundingParams>
>;
