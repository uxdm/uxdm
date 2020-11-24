import {
  GroupNode,
  Color,
  Style,
  RectangleNode,
  LayoutConstraint,
  ConstraintType,
} from 'uxdm';

import { CanvasParams, ElementParams, GRIDsType } from './type';

const fromElementJSON = (params: ElementParams) => {
  const {
    height,
    x,
    y,
    width,
    id,
    fillColorBlueValue,
    fillColorGreenValue,
    fillColorRedValue,
    horizontalPreference,
    verticalPreference,
    isLocked,
  } = params;

  const bounding = { x, height, width, y };

  const color = new Color({
    r: fillColorRedValue,
    g: fillColorGreenValue,
    b: fillColorBlueValue,
  });
  const style = new Style();

  style.addColorFill(color);
  let horizontal: ConstraintType;
  let vertical: ConstraintType;

  switch (horizontalPreference) {
    case 'None':
    default:
      horizontal = 'STRETCH';
      break;
    case 'Left':
      horizontal = 'MIN';
      break;
    case 'Right':
      horizontal = 'MAX';
      break;
  }

  switch (verticalPreference) {
    case 'None':
    default:
      vertical = 'STRETCH';
      break;
    case 'Top':
      vertical = 'MIN';
      break;
    case 'Bottom':
      vertical = 'MAX';
      break;
  }

  const constraints: LayoutConstraint = {
    horizontal,
    vertical,
  };

  return new RectangleNode({
    ...bounding,
    constraints,
    id,
    name: id,
    locked: isLocked === 'false' ? false : isLocked,
    style,
  });
  // switch (type) {
  //   case 'ImageElement':
  //
  //
  //   case 'HeadingImageElement':
  //     break;
  //   case 'FormFieldImageElement':
  //     break;
  //   case 'ParagraphImageElement':
  //     break;
  //   case 'ListElement':
  //     break;
  //   default:
  // }
};

export const fromGridsJSON = (params: GRIDsType): GroupNode[] => {
  const { layouts } = params;

  return layouts.map((canvas) => {
    const {
      id,
      elements,
      elementXPadding,
      elementYPadding,
      canvasWidth,
      canvasHeight,
    } = canvas;

    return new GroupNode({
      id,
      width: canvasWidth,
      height: canvasHeight,
      children: elements?.map(fromElementJSON),
      layout: {
        horizontalPadding: elementXPadding,
        verticalPadding: elementYPadding,
      },
    });
  });
};
