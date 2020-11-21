import { OmitFunction } from '../utils';

/**
 * 抽象矩形
 * @category 抽象对象
 */
export interface IAbstractObject {
  /**
   * 对象内部标识符
   */
  id: string;

  /**
   * Returns a string representation of the node.
   */
  toString(): string;

  /**
   * 将属性输出为 json
   */
  toJSON(): unknown;

  /**
   * 将自身属性输出成可初始化的参数
   */
  toParams(): unknown;
}

/**
 * 抽象对象类型
 * @category 抽象对象
 */
export type AbstractObjectType = OmitFunction<IAbstractObject>;

/**
 * 抽象对象参数
 * @category 抽象对象
 */
export type AbstractObjectParams = Partial<AbstractObjectType>;
