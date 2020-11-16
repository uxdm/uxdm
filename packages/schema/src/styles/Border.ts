import { Assign, Overwrite } from 'utility-types';
import { BasePaintType, IPaint, PaintParams } from './Paint';
import { OmitFunction } from '../utils';

export interface IBorder extends IPaint {
  /**
   * 可见性
   */
  visible: boolean;
  /**
   * 对齐方式
   */
  align: BorderAlignType;
  /**
   * 描边宽度
   * @description
   *
   * @default 0
   * */
  thickness: number;
  /**
   * 指定交替的破折号和间隙长度
   * 以像素为单位
   */
  dashPattern: number[];
  /**
   * 应用于只有一个连接段的顶点的装饰
   */
  lineCap: BorderLineCapType;
  /**
   * 装饰应用于具有两个或多个相连线段的顶点
   */
  lineJoin: BorderLineJoinType;
  /**
   * 描边的位置
   */
  position: BorderPositionType;
}

export enum BorderPositionEnum {
  FULL = 'FULL',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  BOTTOM = 'BOTTOM',
  TOP = 'TOP',
}

export type BorderPositionType = keyof typeof BorderPositionEnum;

export enum BorderLineCapEnum {
  NONE = 'NONE',
  ROUND = 'ROUND',
  SQUARE = 'SQUARE',
}

export type BorderLineCapType = keyof typeof BorderLineCapEnum;

export enum BorderLineJoinEnum {
  /**
   * 除非角度小于“斜角”
   * 否则两个笔画之间的交点将变得尖锐且尖锐，
   * 在这种情况下，尖锐的钻头将被切成“ BEVEL”
   * （因为极尖的角度将具有非常长的尖角边缘）
   */
  MITER = 'MITER',
  /**
   * 接头拐角处的尖头被切掉了
   */
  BEVEL = 'BEVEL',
  /**
   * 圆形边角
   */
  ROUND = 'ROUND',
}

export type BorderLineJoinType = keyof typeof BorderLineJoinEnum;

export enum BorderAlignEnum {
  CENTER = 'CENTER',
  INSIDE = 'INSIDE',
  OUTSIDE = 'OUTSIDE',
}

export type BorderAlignType = keyof typeof BorderAlignEnum;

export type BorderType = Overwrite<OmitFunction<IBorder>, BasePaintType>;

export type BorderParams = Overwrite<Partial<BorderType>, PaintParams>;

export type BorderOptionsType = Pick<
  IBorder,
  'dashPattern' | 'lineJoin' | 'lineCap' | 'align'
>;

export type BorderOptionsParams = Assign<
  Partial<Omit<BorderOptionsType, 'dashPattern'>>,
  { dash?: number; spacing?: number; dashed?: boolean }
>;
