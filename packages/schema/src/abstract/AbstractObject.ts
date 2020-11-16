import { OmitFunction } from '../utils';

/**
 * 抽象矩形
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
}

/**
 * 抽象对象
 */
export type AbstractObjectType = OmitFunction<IAbstractObject>;

/**
 * 抽象对象参数
 */
export type AbstractObjectParams = Partial<AbstractObjectType>;
