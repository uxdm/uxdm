export * from './id';

/**
 * 判断入参 param 是 False
 * @param param
 */
export const isFalse = (param: any) => typeof param === 'boolean' && !param;
