import { IAbstractGroupNode } from '@uxdm/schema';
import { uuid, calcResizingConstraint } from '../utils';
import Style from '../Style/Style';

import {
  AnyLayer,
  SketchObjectType,
  BaseLayerParams,
  SketchFormat,
} from '../types';
import { ResizingConstraint } from '../constants/layout';
import AbstractSketchObject from './AbstractSketchObject';

abstract class AbstractSketchGroup
  extends AbstractSketchObject
  implements IAbstractGroupNode {
  protected constructor(params?: BaseLayerParams) {
    super(params);

    this.id = uuid();
    this.userInfo = {};

    this.style = new Style();

    this.setResizingConstraint(ResizingConstraint.None);

    this.name = params?.name || '';
  }

  children: AnyLayer[];

  /**
   * 是否存在剪贴蒙版
   */
  hasClippingMask = false;

  /**
   * 锁定图层名称
   * */
  nameIsFixed = false;

  /**
   * 是否忽略遮罩链
   */
  shouldBreakMaskChain: boolean = false;

  setFixedWidthAndHeight() {
    this.setResizingConstraint(
      ResizingConstraint.Width,
      ResizingConstraint.Height,
    );
  }

  addLayer(layer: AnyLayer) {
    this.layers.push(layer);
  }

  addLayers(layers: AnyLayer[]) {
    this.layers = this.layers.concat(layers);
  }

  /**
   * 设置位置
   * @param x X轴
   * @param y Y轴
   */
  setPosition({ x, y }: { x: number; y: number }) {
    this.x = x;
    this.y = y;
  }

  /**
   * 获取所有子图层的尺寸
   */
  get childrenBoundingBox() {
    let width = 0;
    let height = 0;
    this.children.forEach((layer) => {
      const layerWidth = layer.width;
      const layerHeight = layer.height;

      if (width < layerWidth) {
        width = layerWidth;
      }
      if (height < layerHeight) {
        height = layerHeight;
      }
    });
    return { width, height };
  }
}

export default AbstractSketchGroup;
