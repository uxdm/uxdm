import { NonFunctionKeys } from 'utility-types';

/**
 * 排除类中包含的所有工具类型
 * @description
 * 排除类中所有函数的参数
 */
export type OmitFunction<T extends object> = Pick<T, NonFunctionKeys<T>>;
