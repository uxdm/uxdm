/**
 * 子级对象的排列方向
 *
 * @description
 * 参数项的效果和 flexbox 的 `flex-direction` 保持一致
 *
 * @see https://cssreference.io/flexbox/#flex-direction
 * @see https://css-tricks.com/almanac/properties/f/flex-direction/
 */
export enum FlexboxArrangeDirection {
  /**
   * 子级元素横向排列
   * @description 让元素从左到右排列
   *
   * 在 css 中等同于 `flex-direction: row;`
   */
  HORIZONTAL = 'HORIZONTAL',
  /**
   * 子级元素横向反向排列
   * @description 让元素从右到左排列
   *
   * 在 css 中等同于 `flex-direction: row-reverse;`
   */
  HORIZONTAL_REVERSE = 'HORIZONTAL_REVERSE',
  /**
   * 子级元素纵向排列
   * @description 让子级元素从上到下排列
   *
   * 在 css 中等同于 `flex-direction: column;`
   */
  VERTICAL = 'VERTICAL',
  /**
   * 子级元素纵向反向排列
   *
   * @description 让子级元素从下到上排列
   *
   * 在 css 中等同于 `flex-direction: column-reverse;`
   */
  VERTICAL_REVERSE = 'VERTICAL_REVERSE',
}

/**
 * 子级对象在容器中的排列方式
 *
 * @description 元素在主轴上的排列方式
 *
 * 参数项的效果和 flexbox 的 `justify-content` 保持一致
 *
 *
 * @see https://cssreference.io/flexbox/#justify-content
 * @see https://css-tricks.com/almanac/properties/j/justify-content/#demo
 */
export enum FlexboxArrange {
  /**
   * 子级排列在行首
   *
   * @description 如果方向是从左到右,所有元素将排在左边
   *
   * 如果方向是从右到左,所有元素将排在右边
   *
   * 在 css 中,该值等同于
   *
   * `justify-content: flex-start;`
   *
   */
  START = 'START',
  /**
   * 子级排列在行末
   *
   * @description 如果方向是从左到右,所有元素将排在右边
   *
   * 如果方向是从右到左,所有元素将排在左边
   *
   * 在 css 中同于 `justify-content: flex-end;`
   *
   */
  END = 'END',
  /**
   * 子级在容器中居中排列
   *
   * 在 css 中同于 `justify-content: center;`
   *
   */
  CENTER = 'CENTER',
  /**
   * 子级撑满容器且元素间距均匀
   *
   * 在 css 中同于 `justify-content: space-between;`
   *
   */
  STRETCH = 'STRETCH',
  /**
   * 子级将以间距相等的方式排布在容器内,包括第一个元素前和最后一个元素后
   *
   * 在 css 中,该值等同于
   *
   * `justify-content: space-evenly;`
   */
  EVEN = 'EVEN',
}

/**
 * 子级对象是否换行的参数
 *
 * @description
 * 参数项的效果和 flexbox 的 `flex-wrap` 保持一致
 *
 *
 * @see https://cssreference.io/flexbox/#flex-wrap
 */
export enum FlexboxWrap {
  /**
   * 子级不换行 排在一行里
   *
   * @description
   */
  NONE = 'NONE',
  /**
   * 子级换行
   *
   * @description
   * 往下换行
   *
   * 在 css 中等于 `flex-wrap: wrap;`
   *
   */
  WRAP = 'WRAP',
  /**
   * 子级反向换行
   *
   * @description
   * 往上换行
   *
   * 在 css 中等于 `flex-wrap: wrap-reverse;`
   *
   */
  WRAP_REVERSE = `WRAP_REVERSE`,
}

/**
 * 子级对象在容器中垂直主轴的对齐方式
 *
 * @description
 * 参数项的效果和 flexbox 的 `align-items` 保持一致
 *
 *
 * @see https://cssreference.io/flexbox/#align-items
 * @see https://css-tricks.com/almanac/properties/a/align-items/
 */
export enum ContainerFlexboxAlign {
  /**
   * 子级排在主轴副轴起点
   *
   * @description
   * 针对主轴来说:
   * 如果方向是从左到右,所有元素将排在左边
   *
   * 如果方向是从右到左,所有元素将排在右边
   *
   * 在 css 中,该值等同于
   *
   * `justify-content: flex-start;`
   *
   * 针对副轴来说:
   *
   */
  START = 'START',
  /**
   * 子级排在副轴终点
   *
   * @description
   * 如果方向是从左到右,所有元素将排在右边
   *
   * 如果方向是从右到左,所有元素将排在左边
   *
   * 在 css 中,该值等同于
   *
   * `justify-content: flex-end;`
   *
   */
  END = 'END',
  /**
   * 子级排在副轴中间
   *
   * 在 css 中,该值等同于
   *
   * `justify-content: center;`
   *
   */
  CENTER = 'CENTER',
  /**
   * 子级在副轴上撑满容器
   *
   * 在 css 中,该值等同于
   *
   * `justify-content: space-between;`
   *
   */
  STRETCH = 'STRETCH',
  /**
   * 子级将以间距相等的方式排布在容器内,包括第一个元素前和最后一个元素后
   *
   * 在 css 中,该值等同于
   *
   * `justify-content: space-evenly;`
   */
  EVEN = 'EVEN',
}

/**
 * 子级对象在容器中副轴(垂直主轴)的对齐方式
 *
 * @description
 * 参数项的效果和 flexbox 的 `align-self` 保持一致
 *
 *
 * @see https://cssreference.io/flexbox/#align-self
 * @see https://css-tricks.com/almanac/properties/a/align-self/
 */
export enum SelfFlexboxAlign {
  /**
   * 子级排在副轴起点
   *
   * @description
   * 如果主轴方向是横向的

   * 在 css 中,该值等同于
   *
   * `justify-self: flex-start;`
   *
   *
   */
  START = 'START',
  /**
   * 子级排在副轴终点
   *
   * @description
   * 如果主轴方向是横向的
   *
   *
   * 在 css 中,该值等同于
   *
   * `justify-self: flex-end;`
   *
   */
  END = 'END',
  /**
   * 子级排在副轴中间
   *
   * 在 css 中,该值等同于
   *
   * `justify-self: center;`
   *
   */
  CENTER = 'CENTER',
  /**
   * 子级在副轴上撑满容器
   *
   * 在 css 中,该值等同于
   *
   * `justify-self: stretch;`
   *
   */
  STRETCH = 'STRETCH',
  /**
   * 使用自动排列
   * 该属性只对 self 有效
   */
  AUTO = 'AUTO',
}
