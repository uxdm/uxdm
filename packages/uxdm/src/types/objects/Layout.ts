import { DeepPartial } from 'utility-types';
import {
  // type
  PaddingValue,
  SelfLayoutModeType,
  SelfFlexboxAlignType,
  LayoutModeType,
  LayoutConstraint,
  ContainerFlexboxAlignType,
  FlexboxArrangeType,
  FlexboxArrangeDirectionType,
  FlexboxWrapType,
} from '../constants';
import { IAbstractObject } from '../abstract';
import { OmitFunction } from '../utils';
/**
 * 布局对象的声明接口
 * @category 布局
 */
export interface ILayout extends IAbstractObject {
  /**
   * 约束参数
   */
  constraints: LayoutConstraint;

  // ========== Flexbox 配置项 ============ //
  /**
   * 元素本身的 layout 模式
   *
   * @default {SelfLayoutMode.Auto} 默认是 auto
   */
  selfLayoutMode: SelfLayoutModeType;
  /**
   * 元素本身采用的 flexbox align 属性
   * @description 如果自己是 flexbox 的子级 这个配置项会生效
   *
   */
  selfFlexboxAlign: SelfFlexboxAlignType;
  /**
   * 元素在容器内部的排序
   *
   * @description order 值越大排在轴末,值越小排在轴前.
   * 参数项和 flexbox 的 `order` 保持一致
   *
   * PS: 该属性可能用不太到
   *
   * @default 0
   *
   * @see https://cssreference.io/flexbox/#order
   * @see https://css-tricks.com/almanac/properties/o/order/
   */
  selfFlexboxOrder: number;
  /**
   * 元素应扩展的量
   * @description 定义如果有可用空间，定义了 grow 的元素就可以进行缩放
   *
   * @see https://cssreference.io/flexbox/#flex-grow
   */
  selfFlexboxGrow: number;
  /**
   * 元素应该收缩的量
   * @description 如果没有足够的可用空间，应收缩多少
   *
   * @see https://cssreference.io/flexbox/#flex-shrink
   */
  selfFlexboxShrink: number;

  toJSON(): LayoutType;
}

/**
 * 布局对象 JSON 结构
 * @category 布局
 */ export type LayoutType = OmitFunction<ILayout>;
/**
 * 布局对象入参
 * @category 布局
 */
export type LayoutParams = DeepPartial<LayoutType>;

/**
 * 作为容器的布局参数
 * @description
 * group 类型的节点才能具有这个参数
 * 针对子级所使用的布局参数模式
 */
export interface IContainerLayout extends ILayout {
  /**
   * 子级的布局参数
   */
  layoutMode: LayoutModeType;
  /**
   * flexbox 模式下的配置项
   *
   *  @description
   * 如果 layoutMode 是 flexbox
   * 那么则使用这个参数项
   */
  flexbox?: ContainerFlexbox;
  /**
   * grid 模式下的配置项
   * @description
   * TODO: 待补充
   */
  grid?: {};

  // ======== 间距 ======== //
  /**
   * 横向内间距
   * @description 横向内间距
   * 如果只输入一个值 则是左右一样
   * 如果输入一个包含两个值的数组,则是[0]是左间距 [1]是右间距
   */
  horizontalPadding?: PaddingValue;
  /**
   * 纵向内间距
   * @description 纵向内间距
   * 如果只输入一个值 则是上下一样
   * 如果输入一个包含两个值的数组,则是[0]是顶间距 [1]是底间距
   */
  verticalPadding?: PaddingValue;
  /**
   * 子级之间的距离
   */
  itemSpacing?: number;
  toJSON(): ContainerLayoutType;
}

export interface ContainerFlexbox {
  /**
   * 描述容器的主轴布局方向
   * @description
   * 主轴
   */
  direction: FlexboxArrangeDirectionType;
  /**
   * 描述子级是否换行
   *
   * 对应 css 中 flexbox 的 `flex-wrap`
   */
  wrap: FlexboxWrapType;
  /**
   * 用于描述子级主轴的排列方式
   * @description
   * 此属性仅适用容器的直接子级
   */
  arrange: FlexboxArrangeType;
  /**
   * 用于描述子级垂直主轴的对齐方式
   * @description
   * 此属性仅适用容器的直接子级
   */
  align: ContainerFlexboxAlignType;
}

export type ContainerLayoutType = OmitFunction<IContainerLayout>;

export type ContainerLayoutParams = DeepPartial<ContainerLayoutType>;
