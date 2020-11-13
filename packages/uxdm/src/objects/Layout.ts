import {
  LayoutConstraint,
  ILayout,
  LayoutParams,
  LayoutType,
  SelfFlexboxAlign,
  SelfLayoutMode,
} from '@uxdm/schema';

import { AbstractObject } from '../abstract';

/**
 * 布局对象
 */
export class Layout extends AbstractObject implements ILayout {
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
      this.selfFlexboxAlign =
        selfFlexboxAlign || ('AUTO' as SelfFlexboxAlign.AUTO);
      this.selfFlexboxGrow = selfFlexboxGrow || 0;
      this.selfLayoutMode = selfLayoutMode || ('AUTO' as SelfLayoutMode.Auto);
    }
  }

  selfLayoutMode: SelfLayoutMode;

  selfFlexboxAlign: SelfFlexboxAlign;

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
