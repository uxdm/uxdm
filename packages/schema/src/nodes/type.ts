/**
 * 节点类型
 * @description
 */
export enum NodeEnum {
  GROUP = 'GROUP',
  RECTANGLE = 'RECTANGLE',
  LINE = 'LINE',
}

export type NodeType = keyof typeof NodeEnum;
