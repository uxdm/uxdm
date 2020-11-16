import { Overwrite } from 'utility-types';
import { BasePaintType, IPaint, PaintParams } from './Paint';
import { OmitFunction } from '../utils';

export type FillType = Overwrite<OmitFunction<IPaint>, BasePaintType>;

export type FillParams = Overwrite<Partial<FillType>, PaintParams>;
