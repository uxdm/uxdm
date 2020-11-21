import {
  ContainerFlexbox,
  ContainerFlexboxAlign,
  ContainerLayoutParams,
  ContainerLayoutType,
  FlexboxArrange,
  FlexboxArrangeDirection,
  FlexboxWrap,
  IContainerLayout,
  LayoutModeEnum,
  LayoutModeType,
  PaddingValue,
} from '@uxdm/schema';
import { Layout } from './Layout';

/**
 * 容器布局
 * @category 对象
 */
export class ContainerLayout extends Layout implements IContainerLayout {
  constructor(params?: ContainerLayoutParams) {
    super(params);

    if (params) {
      const {
        grid,
        flexbox,
        layoutMode,
        horizontalPadding,
        verticalPadding,
      } = params;
      this.flexbox = { ...this.flexbox, ...flexbox };
      this.horizontalPadding = horizontalPadding || 0;
      this.verticalPadding = verticalPadding || 0;
      this.layoutMode = layoutMode || 'FREE';
      this.grid = grid;
    }
  }

  layoutMode: LayoutModeType = 'FREE' as LayoutModeEnum.FREE;

  flexbox: ContainerFlexbox = {
    align: 'STRETCH' as ContainerFlexboxAlign.STRETCH,
    arrange: 'START' as FlexboxArrange.START,
    direction: 'HORIZONTAL' as FlexboxArrangeDirection.HORIZONTAL,
    wrap: 'NONE' as FlexboxWrap.NONE,
  };

  grid: {};

  horizontalPadding: PaddingValue = 0;

  verticalPadding: PaddingValue = 0;

  itemSpacing: number = 0;

  toJSON(): ContainerLayoutType {
    const json = super.toJSON();
    return {
      ...json,
      flexbox: this.flexbox,
      layoutMode: this.layoutMode,
      verticalPadding: this.verticalPadding,
      itemSpacing: this.itemSpacing,
      horizontalPadding: this.horizontalPadding,
    };
  }
}
