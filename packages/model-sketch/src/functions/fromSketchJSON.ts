import { SketchFormat } from '../types';
import { Rectangle, Group } from '../layers';

/**
 * 将 单个 SketchJSON 对象 转换为 UXDM Sketch Model
 */
export const fromSingleSketchFormat = (json: SketchFormat.AnyLayer) => {
  switch (json._class) {
    case 'group':
      return Group.fromSketchJSON(json);
    // default:
    case 'rectangle':
      return Rectangle.fromSketchJSON(json);
    // case 'symbolMaster':
    //   break;
    // case 'artboard':
    //   break;
    // case 'oval':
    //   break;
    // case 'polygon':
    //   break;
    // case 'shapePath':
    //   break;
    // case 'star':
    //   break;
    // case 'triangle':
    //   break;
    // case 'shapeGroup':
    //   break;
    // case 'text':
    //   break;
    // case 'symbolInstance':
    //   break;
    // case 'slice':
    //   break;
    // case 'MSImmutableHotspotLayer':
    //   break;
    // case 'bitmap':
    //   break;
    // case 'page':
    //   break;
    default:
      throw Error('不符合 Sketch JSON Format');
  }
};

/**
 * 将 SketchJSON 转换为 UXDM Sketch Model
 * @param json
 */
export const fromSketchJSON = (
  json: SketchFormat.AnyLayer | SketchFormat.AnyLayer[],
) => {
  if (json instanceof Array) {
    return json.map(fromSingleSketchFormat);
  }
  return fromSingleSketchFormat(json);
};
