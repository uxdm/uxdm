import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { Intersection } from 'utility-types';

export { default as SketchFormat } from '@sketch-hq/sketch-file-format-ts';

export type CommonSketchProperty = Omit<
  Intersection<
    Intersection<SketchFormat.Rectangle, SketchFormat.Group>,
    SketchFormat.Page
  >,
  '_class'
>;

export type SketchGroupLayout =
  | SketchFormat.InferredGroupLayout // 水平或垂直布局
  | SketchFormat.FreeformGroupLayout;

/**
 * group 或 symbol 的 layout 参数类型
 */
export type GroupLayoutType =
  | 'BOTTOM_TO_TOP'
  | 'HORIZONTALLY_CENTER'
  | 'VERTICALLY_CENTER'
  | 'RIGHT_TO_LEFT'
  | 'LEFT_TO_RIGHT'
  | 'TOP_TO_BOTTOM'
  | 'NONE';

export type SketchObjectType =
  | 'artboard'
  | 'bitmap'
  | 'border'
  | 'borderOptions'
  | 'color'
  | 'fill'
  | 'gradient'
  | 'group'
  | 'innerShadow'
  | 'ellipse'
  | 'oval' // sketch 中 用的是 oval
  | 'page'
  | 'polygon'
  | 'rect'
  | 'rectangle'
  | 'shadow'
  | 'shapeGroup'
  | 'shapePath'
  | 'slice'
  | 'star'
  | 'symbolInstance'
  | 'symbolMaster'
  | 'text'
  | 'triangle'
  | 'svg';
