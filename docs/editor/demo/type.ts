import { Overwrite, Required } from 'utility-types';

/**
 * GRIDs 最外层的容器
 */
export interface CanvasType {
  id: string;
  isEdited: boolean;
  /**
   * 是否被优化过
   */
  isOptimised: boolean;
  userRating: 0;
  /**
   * 画布尺寸
   */
  canvasHeight: number;
  /**
   * 画笔宽度
   */
  canvasWidth: number;
  elementYPadding: number;
  borderXPadding: number;
  borderYPadding: number;
  elementXPadding: number;
  score: number;
  elements: Element[];
}

export interface GRIDsType {
  layouts: CanvasType[];
}

export interface Element {
  id: string;
  horizontalPreference: 'None' | 'Left' | 'Right';
  verticalPreference: 'None' | 'Top' | 'Bottom';
  x: number;
  y: number;
  isDrawingFill: 1;
  width: number;
  type: ElementType;
  fillColorGreenValue: number;
  fillColorBlueValue: number;
  fillColorRedValue: number;
  isLocked: 'false' | true;
  height: number;
}

export type ElementType =
  | 'ImageElement'
  | 'HeadingImageElement'
  | 'FormFieldImageElement'
  | 'ParagraphImageElement'
  | 'ListElement';

export type ElementParams = Required<Partial<Element>, 'type'>;
export type CanvasParams = Partial<
  Overwrite<CanvasType, { elements: ElementParams[] }>
>;
export type GridsParams<T> = T extends CanvasType
  ? CanvasParams
  : ElementParams;
