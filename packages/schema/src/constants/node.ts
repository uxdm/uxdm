/**
 * 节点类型
 * @description
 */
export enum NodeEnum {
  Group = 'Group',
  Rectangle = 'Rectangle',
  Line = 'Line',
  Artboard = 'Artboard',
  'Page' = 'Page',
  Frame = 'Frame',
  Ellipse = 'Ellipse',
}

export type NodeType = keyof typeof NodeEnum;
