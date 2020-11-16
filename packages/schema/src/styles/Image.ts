import { IAbstractObject } from '../abstract/AbstractObject';
import { OmitFunction } from '../utils';

export interface IImage extends IAbstractObject {
  /**
   * 获取 url 转换为 base64
   */
  init(): Promise<void>;

  /**
   * 成功初始化
   */
  initialized: boolean;

  /**
   * 外部传入的 URL
   */
  url: string;

  /**
   * 转换成的 base64 数据
   */
  base64: string;

  /**
   * 还原输入的参数
   */
  toParams(): string;
}

export type ImageType = Omit<OmitFunction<IImage>, 'initialized'>;
