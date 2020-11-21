import {
  LayoutConstraint,
  ILayout,
  LayoutParams,
  LayoutType,
  SelfLayoutModeType,
  SelfFlexboxAlignType,
} from '@uxdm/schema';

import { AbstractObject } from '../abstract';

/**
 * 布局对象
 * @description
 * 此布局对象用于描述节点自身在层级中的布局关系,
 * 也是所有图形节点的的 layout 属性类型.
 * @relate
 * 如希望描述 Group 类型的节点布局
 * 使用 ContainerLayout
 *
 * @category 对象
 */
export class Layout extends AbstractObject implements ILayout {
  /**
   * 布局对象初始化方法
   * @param params
   */
  constructor(params?: LayoutParams) {
    super(params);

    if (params) {
      const {
        constraints,
        selfFlexboxAlign,
        selfFlexboxGrow,
        selfFlexboxOrder,
        selfFlexboxShrink,
        selfLayoutMode,
      } = params;

      this.constraints = { ...this.constraints, ...constraints };
      this.selfFlexboxShrink = selfFlexboxShrink || 0;
      this.selfFlexboxOrder = selfFlexboxOrder || 0;
      this.selfFlexboxAlign = selfFlexboxAlign || 'AUTO';
      this.selfFlexboxGrow = selfFlexboxGrow || 0;
      this.selfLayoutMode = selfLayoutMode || 'Auto';
    }
  }

  /**
   * 自身的布局模式
   *
   * @default 默认值 Auto
   */
  selfLayoutMode: SelfLayoutModeType = 'Auto';

  /**
   * 自身采用的 flexbox align 属性
   * @description 如果自己是 flexbox 的子级 这个配置项会生效
   * @default 默认值 Auto
   */
  selfFlexboxAlign: SelfFlexboxAlignType;

  selfFlexboxOrder: number;

  selfFlexboxGrow: number;

  selfFlexboxShrink: number;

  constraints: LayoutConstraint = {
    horizontal: 'MIN',
    vertical: 'MIN',
  };

  toJSON(): LayoutType {
    const json = super.toJSON();

    return {
      ...json,
      constraints: this.constraints,
      selfFlexboxAlign: this.selfFlexboxAlign,
      selfFlexboxOrder: this.selfFlexboxOrder,
      selfFlexboxShrink: this.selfFlexboxShrink,
      selfLayoutMode: this.selfLayoutMode,
      selfFlexboxGrow: this.selfFlexboxGrow,
    };
  }
}
