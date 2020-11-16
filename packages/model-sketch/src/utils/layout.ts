import { GroupLayoutType, SketchFormat } from '../types';
import { GroupLayout, ResizingConstraint } from '../constants/layout';

export const containsAllItems = (needles: any[], haystack: string | any[]) =>
  needles.every((needle) => haystack.includes(needle));

export const noHeight = [
  ResizingConstraint.Top,
  ResizingConstraint.Bottom,
  ResizingConstraint.Height,
];

export const noWidth = [
  ResizingConstraint.Left,
  ResizingConstraint.Right,
  ResizingConstraint.Width,
];

/**
 * 计算 Resizing 变量
 */
export const calcResizingConstraint = (...args: ResizingConstraint[]) => {
  console.log(args);
  const validValues = Object.values(ResizingConstraint);

  if (!args.every((arg) => validValues.includes(arg))) {
    throw new Error('Unknown resizing constraint');
  } else if (containsAllItems(noHeight, args)) {
    throw new Error("Can't fix height when top & bottom are fixed");
  } else if (containsAllItems(noWidth, args)) {
    throw new Error("Can't fix width when left & right are fixed");
  }

  return args.length > 0
    ? // eslint-disable-next-line no-bitwise
      args.reduce((acc, item) => acc & item, args[0])
    : ResizingConstraint.None;
};

/**
 * 获取布局参数
 * @param layoutType
 */
export const getGroupLayout = (
  layoutType?: GroupLayoutType,
): SketchFormat.InferredGroupLayout | SketchFormat.FreeformGroupLayout => {
  switch (layoutType) {
    case GroupLayout.LEFT_TO_RIGHT: {
      return {
        _class: SketchFormat.ClassValue.MSImmutableInferredGroupLayout,
        axis: SketchFormat.InferredLayoutAxis.Horizontal,
        layoutAnchor: SketchFormat.InferredLayoutAnchor.Min,
      };
    }

    case GroupLayout.HORIZONTALLY_CENTER: {
      return {
        _class: SketchFormat.ClassValue.MSImmutableInferredGroupLayout,
        axis: SketchFormat.InferredLayoutAxis.Horizontal,
        layoutAnchor: SketchFormat.InferredLayoutAnchor.Middle,
      };
    }

    case GroupLayout.RIGHT_TO_LEFT: {
      return {
        _class: SketchFormat.ClassValue.MSImmutableInferredGroupLayout,
        axis: SketchFormat.InferredLayoutAxis.Horizontal,
        layoutAnchor: SketchFormat.InferredLayoutAnchor.Max,
      };
    }

    case GroupLayout.TOP_TO_BOTTOM: {
      return {
        _class: SketchFormat.ClassValue.MSImmutableInferredGroupLayout,
        axis: SketchFormat.InferredLayoutAxis.Vertical,
        layoutAnchor: SketchFormat.InferredLayoutAnchor.Min,
      };
    }

    case GroupLayout.VERTICALLY_CENTER: {
      return {
        _class: SketchFormat.ClassValue.MSImmutableInferredGroupLayout,
        axis: SketchFormat.InferredLayoutAxis.Vertical,
        layoutAnchor: SketchFormat.InferredLayoutAnchor.Middle,
      };
    }

    case GroupLayout.BOTTOM_TO_TOP: {
      return {
        _class: SketchFormat.ClassValue.MSImmutableInferredGroupLayout,
        axis: SketchFormat.InferredLayoutAxis.Vertical,
        layoutAnchor: SketchFormat.InferredLayoutAnchor.Max,
      };
    }

    default:
      return {
        _class: SketchFormat.ClassValue.MSImmutableFreeformGroupLayout,
      };
  }
};