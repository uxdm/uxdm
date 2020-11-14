import { AbstractNodeParams, RectangleNodeParams } from '@uxdm/schema';
import { Group } from './layers/Group';
import { Rectangle } from './layers/Rectangle';
import { Assign } from 'utility-types';

/**
 * 任意可以成为图层的对象
 */
export type AnyLayer = Group | Rectangle;

/**
 * 抽象节点的入参
 */
export type SketchLayerParams = AbstractNodeParams;

export type SketchGroupParams = Assign<
  SketchLayerParams,
  { children?: AnyLayer[] }
>;

export type SketchRectangleParams = Assign<
  AbstractNodeParams,
  RectangleNodeParams
>;
