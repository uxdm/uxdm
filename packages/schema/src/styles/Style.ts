import { DeepPartial, Overwrite } from 'utility-types';
import { IAbstractObject } from '../abstract/AbstractObject';
import { IShadow, ShadowParams, ShadowType } from './Shadow';
import { IPaint } from './Paint';
import { BorderOptionsType, BorderParams, BorderType, IBorder } from './Border';
import { OmitFunction } from '../utils';
import { FillParams, FillType } from './Fill';
import { BlendModeType } from '../constants';

/**
 * 样式
 */
export interface IStyle extends IAbstractObject {
  /**
   * 填充
   * */
  fills: IPaint[];

  /**
   * 外阴影
   * */
  shadows: IShadow[];

  /**
   * 内阴影
   * */
  innerShadows: IShadow[];

  /**
   * 描边
   * */
  borders: IBorder[];
  /**
   * 针对现存设计软件适配的 Border 参数
   * @description
   * 在实际的设计场景中,描边的位置 间距 虚线 对齐方式等参数应该都单独控制
   * 而在 sketch 和 figma 的字段设计中 borderOptions 并不是一个数组
   * 这就导致所有描边只能共用一个描边配置项
   * 也就是这个参数项的由来
   *
   * 而真正合理的字段设计 应该是将 BorderOptions 集成到每一条描边中
   * 在 UXDM 中,该项参数集成在了 IBorder 中
   */
  borderOptions: BorderOptionsType;

  opacity: number;

  blendMode: BlendModeType;

  toJSON(): StyleType;

  toParams(): StyleParams;
}

export type StyleType = Overwrite<
  OmitFunction<IStyle>,
  {
    fills: FillType[];
    borders: BorderType[];
    shadows: ShadowType[];
    innerShadows: ShadowType[];
  }
>;

export type StyleParams = Overwrite<
  DeepPartial<OmitFunction<IStyle>>,
  {
    fills?: FillParams[];
    borders?: BorderParams[];
    shadows?: Omit<ShadowParams, 'type'>[];
    innerShadows?: Omit<ShadowParams, 'type'>[];
  }
>;
