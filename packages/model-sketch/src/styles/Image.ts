import { Image as BaseImage } from 'uxdm';
import { SketchFormat } from '../types';

/**
 * 图片资产
 * 用于添加到 Fill 和 Border 的内容
 */
class Image extends BaseImage {
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

  /**
   * 从 Sketch JSON 获得 Image 对象
   * @param json
   */
  static fromSketchJSON(
    json: SketchFormat.DataRef | SketchFormat.FileRef,
  ): Image {
    const { _ref } = json;

    const image = new Image({ id: _ref });
    // 说明是 DataRef
    if ('data' in json) {
      image.base64 = json.data._data;
      return image;
    }
    // 否则是 FileRef
    // 要去找相应的文件入参
    return image;
  }
}

export default Image;
