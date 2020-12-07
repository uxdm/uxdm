/**
 * 确认 params 是否包含的有效参数个数
 * @param params
 * @param count 有效参数下限 必须要超过这个值才算有效
 */
export const checkValidParams = (params: object, count: number) => {
  const layoutValues = Object.values(params).filter((p) => p);
  return layoutValues.length > count;
};

/**
 * 判断参数是否是 number
 * @param param
 */
export const isNumber = (param) => typeof param === 'number';
