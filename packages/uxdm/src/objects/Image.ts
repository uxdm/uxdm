import axios from 'axios';
import { IImage, ImageParams, ImageType } from '../types';
import { AbstractObject } from '../abstract/AbstractObject';
import { blobToBase64, initImageURL, getBase64ImageString } from '../utils';

/**
 * 图片资产
 * @category 对象
 * */
export class Image extends AbstractObject implements IImage {
  constructor(params: ImageParams) {
    super();
    if (typeof params === 'string') {
      const { url: safeURL, base64 } = initImageURL(params);
      this.url = safeURL;
      this.base64 = base64;
    } else {
      const { base64, id, url } = params;
      this.base64 = base64;
      this.id = id;
      this.url = url;
    }
  }

  /**
   * 是否初始化
   * @description
   * 当 init 成功执行后 该值变为 true
   */
  initialized = false;

  /**
   * 外部传入的 URL
   */
  url: string;

  /**
   * 转换成的 base64 数据
   */
  base64: string;

  /**
   * 完成图片资源的初始化
   */
  async init() {
    if (this.url.startsWith('http')) {
      const { data } = await axios.get(this.url, { responseType: 'blob' });
      const dataURL = await blobToBase64(data);
      const base64 = getBase64ImageString(dataURL);
      if (base64) {
        this.base64 = base64;
        this.initialized = true;
      }
    }
  }

  toJSON(): ImageType {
    const json = super.toJSON();
    return {
      ...json,
      base64: this.base64,
      url: this.url,
    };
  }

  // TODO: 如何解决继承后无法修改输出类型的问题?
  // @ts-ignore
  toParams(): string {
    return this.url;
  }

  static fromJSON(params: ImageType): Image {
    return new Image(params.url);
  }
}
