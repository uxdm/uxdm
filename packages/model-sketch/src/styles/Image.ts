import { Image as BaseImage } from 'uxdm';
import { SketchFormat } from '../types';
import { uuid } from '../utils';

/**
 * 图片资产
 * 用于添加到 Fill 和 Border 的内容
 */
class Image extends BaseImage {
  constructor(params) {
    super(params);
    this.id = uuid();
  }

  toSketchJSON(): SketchFormat.DataRef {
    return {
      _class: 'MSJSONOriginalDataReference',
      _ref_class: 'MSImageData',
      _ref: this.id,
      data: {
        _data: this.base64,
      },
      sha1: {
        _data: '',
      },
    };
  }
}

export default Image;
