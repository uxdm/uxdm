import { Assign } from 'utility-types';
import { ContainerLayout } from 'uxdm';
import { IAbstractGroupNode, NodeType } from '@uxdm/schema';
import { AbstractSketchObject } from '../abstract';
import { getGroupLayout } from '../utils';
import { SketchFormat, GroupLayoutType, SketchGroupLayout } from '../types';
import { AnyLayer } from '../types/anyLayer';
import { SketchLayerParams } from '../types/layerType';

export type SketchGroupParams = Assign<
  SketchLayerParams,
  { children?: AnyLayer[] }
>;

export class Group extends AbstractSketchObject implements IAbstractGroupNode {
  constructor(params?: SketchGroupParams) {
    super(params);
    if (params) {
      const { layout, children } = params;
      if (layout) {
        this.layout = new ContainerLayout(params.layout);
      }
      if (children) {
        this.addLayers(children);
      }
    }
  }

  type: NodeType = 'Group';

  children: AnyLayer[] = [];

  layout: ContainerLayout = new ContainerLayout();

  /**
   * 是否点穿
   */
  hasClickThrough = false;

  /**
   * 添加图层
   * @param layer
   */
  addLayer(layer: AnyLayer) {
    // 在组里面的位置是相对位置关系
    // 因此在添加图层的时候需要减掉父级的位置
    // 算出相对位置
    layer.x -= this.x;
    layer.y -= this.y;
    layer.rotation -= this.rotation;
    this.children.push(layer);
  }

  /**
   * 添加图层组
   * @param layers
   */
  addLayers(layers: AnyLayer[]) {
    layers.forEach((layer) => {
      this.addLayer(layer);
    });
  }

  /**
   * Symbol 布局
   *
   * @default 自由布局
   */
  groupLayout: SketchGroupLayout = getGroupLayout('NONE');

  /**
   * 设置布局参数
   * @param layoutType
   */
  setGroupLayout(layoutType: GroupLayoutType) {
    this.groupLayout = getGroupLayout(layoutType);
  }

  /**
   * 获取 group 子级的尺寸
   */
  get boundingSize() {
    let width: number;
    let height: number;

    width = this.width;
    height = this.height;

    if (width === 0 || height === 0) {
      this.children.forEach((layer) => {
        const layerWidth = layer.x + layer.width;
        const layerHeight = layer.y + layer.height;

        if (width < layerWidth) {
          width = layerWidth;
        }
        if (height < layerHeight) {
          height = layerHeight;
        }
      });
    }

    return { width, height };
  }

  clone(): Group {
    const { id, ...params } = this.toJSON();

    return new Group(params);
  }

  /**
   * 转换为 Sketch JSON 对象
   */
  toSketchJSON = (): SketchFormat.Group => {
    const json = super.toSketchJSON();

    return {
      ...json,
      _class: 'group',
      hasClickThrough: this.hasClickThrough,
      groupLayout: this.groupLayout,
      layers: this.children.map((layer) => layer.toSketchJSON()),
    };
  };
}
