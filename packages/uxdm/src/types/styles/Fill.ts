import { Overwrite } from 'utility-types';
import { BasePaintType, IPaint, PaintParams } from './Paint';
import { OmitFunction } from '../utils';

export interface IFill extends IPaint {
  /**
   * 可见性
   */
  visible: boolean;
}

export type FillType = Overwrite<OmitFunction<IFill>, BasePaintType>;

export type FillParams = Overwrite<Partial<FillType>, PaintParams>;
